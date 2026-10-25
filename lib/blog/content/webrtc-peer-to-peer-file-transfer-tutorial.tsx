import Link from "next/link"

export function WebrtcPeerToPeerFileTransferTutorialBody() {
  return (
    <>
      <p>
        Think about what happens when you want to send a 400 MB video or a snippet of environment
        variables from your laptop to a phone or a colleague&apos;s machine across the room. The
        default workflow is absurd: you upload the file to Google Drive, WeTransfer, or Slack; wait
        for it to travel to a cloud storage bucket in another country; generate a share link; deal
        with account logins or file-size paywalls; and remember to delete it from the cloud later.
      </p>
      <p>
        That frustration is why I built <Link href="/projects/relay">Relay</Link> (live at{" "}
        <a href="https://relay.thisistayyab.dev" target="_blank" rel="noopener noreferrer">
          relay.thisistayyab.dev
        </a>
        ) — a zero-signup, privacy-first real-time workspace that pairs an instant collaborative
        room notepad with <strong>browser-to-browser WebRTC peer-to-peer file transfer</strong>. Once
        two devices join the same short room code, files stream directly between the two browsers
        over a DTLS-encrypted <code>RTCDataChannel</code>. No file bytes are ever uploaded to S3,
        written to a database, or buffered on our backend server.
      </p>
      <p>
        This guide explains how WebRTC data channels work under the hood, how to build signaling
        with <strong>Socket.IO</strong>, why a naive file-send loop crashes on files over a few
        megabytes, and how to implement chunking and backpressure control in production.
      </p>

      <h2 id="how-webrtc-data-channels-work">
        How WebRTC Data Channels Work (Without the Jargon Fog)
      </h2>
      <p>
        Most tutorials introduce WebRTC as a video-chat API and treat data channels as an
        afterthought. Strip away cameras and microphones and a WebRTC connection has three moving
        parts:
      </p>
      <ol>
        <li>
          <strong>Signaling (How peers find each other):</strong> Two browsers on the internet
          cannot open a socket to each other out of thin air. They need a lightweight rendezvous
          channel — in Relay&apos;s case, a <strong>Node.js + Express + Socket.IO</strong> server —
          solely to exchange session descriptions (SDP offer and answer) and network path candidates
          (ICE candidates). Signaling carries ~2 KB of JSON handshake metadata; it never touches
          your files.
        </li>
        <li>
          <strong>NAT Traversal with STUN (and TURN when necessary):</strong> Your laptop does not
          know its own public IP and port mapping behind your home or office router. A{" "}
          <strong>STUN</strong> server is a tiny echo service that tells each browser &quot;here is
          the public IP:port your router assigned you,&quot; allowing the two browsers to punch a
          direct UDP path to each other. On the ~10–15% of enterprise or cellular networks with
          strict symmetric NATs where direct hole-punching is blocked, a <strong>TURN</strong> relay
          forwards the encrypted packets without ever having the keys to decrypt them.
        </li>
        <li>
          <strong>
            <code>RTCDataChannel</code> (SCTP over DTLS over UDP):
          </strong>{" "}
          Once the peer connection opens, an <code>RTCDataChannel</code> gives you a bidirectional
          binary/string pipe with a WebSocket-like API (`channel.send()`, `channel.onmessage`). Under
          the hood, it runs <strong>SCTP</strong> (for framing, ordering, and congestion control) on
          top of <strong>DTLS</strong> (mandatory end-to-end encryption) over UDP.
        </li>
      </ol>

      <h2 id="signaling-handshake-with-socket-io">
        Step 1: The Signaling Handshake with Socket.IO
      </h2>
      <p>
        In Relay, users join a human-readable room code (like <code>/alpha-room</code>). When a
        second peer joins the room and the sender initiates a file transfer, the two peers exchange
        an SDP Offer, an SDP Answer, and trickled ICE candidates over Socket.IO:
      </p>
      <pre>
        <code>{`// Client-side WebRTC setup (simplified from Relay)
const rtcConfig: RTCConfiguration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
  ],
}

export function createPeerConnection(socket: Socket, targetPeerId: string) {
  const pc = new RTCPeerConnection(rtcConfig)

  // Forward local ICE candidates to the remote peer via Socket.IO
  pc.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit("webrtc:ice-candidate", {
        to: targetPeerId,
        candidate: event.candidate,
      })
    }
  }

  return pc
}`}</code>
      </pre>
      <p>
        One subtle production bug to avoid: <strong>ICE candidates often arrive before{" "}
        <code>setRemoteDescription()</code> has resolved</strong> on the receiving browser. If you
        call <code>pc.addIceCandidate()</code> before <code>pc.remoteDescription</code> is set, the
        browser throws an <code>InvalidStateError</code> and the connection silently stalls on some
        networks. Always queue incoming ICE candidates in an array until{" "}
        <code>setRemoteDescription()</code> finishes, then flush the queue.
      </p>

      <h2 id="chunking-and-backpressure">
        Step 2: Why Naive File Sending Fails — Chunking &amp; Backpressure
      </h2>
      <p>
        A naive WebRTC send implementation reads a file into an <code>ArrayBuffer</code> and calls{" "}
        <code>dataChannel.send(buffer)</code>. That works for a 20 KB screenshot and blows up
        immediately on a 50 MB archive for two reasons:
      </p>
      <ol>
        <li>
          <strong>SCTP message size limits:</strong> Across browser engines (Chromium, Firefox,
          WebKit), a single <code>RTCDataChannel.send()</code> frame above 64 KB to 256 KB can
          exceed the negotiated SCTP maximum message size and throw a{" "}
          <code>TypeError / OperationError</code>. Slicing files into <strong>64 KB chunks</strong>{" "}
          (<code>65536</code> bytes) is the safe cross-browser sweet spot.
        </li>
        <li>
          <strong>Buffer overflow when disk read outruns network upload:</strong> Reading a 500 MB
          file from a local NVMe SSD takes ~200 milliseconds. Uploading 500 MB over a 40 Mbps Wi-Fi
          link takes ~100 seconds. If you loop over the file in a tight <code>while</code> loop and
          call <code>channel.send(chunk)</code> 8,000 times in a row, the browser&apos;s internal
          16 MB SCTP send buffer fills up in less than a second and the browser forcibly closes the
          data channel!
        </li>
      </ol>
      <p>
        The fix is <strong>event-driven backpressure</strong> using{" "}
        <code>channel.bufferedAmount</code> and <code>channel.bufferedAmountLowThreshold</code>:
      </p>
      <pre>
        <code>{`const CHUNK_SIZE = 64 * 1024 // 64 KB per SCTP message
const HIGH_WATER_MARK = 1024 * 1024 // Pause sending when buffer > 1 MB
const LOW_WATER_MARK = 256 * 1024 // Resume when buffer drains below 256 KB

export async function sendFileOverChannel(
  file: File,
  channel: RTCDataChannel,
  onProgress: (sentBytes: number, totalBytes: number) => void,
) {
  channel.binaryType = "arraybuffer"
  channel.bufferedAmountLowThreshold = LOW_WATER_MARK

  // 1. Send JSON file header so receiver knows name, size, and MIME type
  channel.send(
    JSON.stringify({
      type: "file-meta",
      name: file.name,
      size: file.size,
      mimeType: file.type || "application/octet-stream",
    }),
  )

  let offset = 0

  while (offset < file.size) {
    // Wait for bufferedAmountlow event if the outbound queue is full
    if (channel.bufferedAmount > HIGH_WATER_MARK) {
      await new Promise<void>((resolve, reject) => {
        const onLow = () => {
          cleanup()
          resolve()
        }
        const onClose = () => {
          cleanup()
          reject(new Error("Data channel closed during transfer"))
        }
        const cleanup = () => {
          channel.removeEventListener("bufferedamountlow", onLow)
          channel.removeEventListener("close", onClose)
        }
        channel.addEventListener("bufferedamountlow", onLow)
        channel.addEventListener("close", onClose)
      })
    }

    const slice = file.slice(offset, offset + CHUNK_SIZE)
    const buffer = await slice.arrayBuffer()
    channel.send(buffer)

    offset += buffer.byteLength
    onProgress(offset, file.size)
  }

  channel.send(JSON.stringify({ type: "file-complete" }))
}`}</code>
      </pre>
      <p>
        Notice how <code>file.slice(offset, offset + CHUNK_SIZE)</code> only pulls 64 KB into RAM at
        a time instead of loading the entire file into memory, and the{" "}
        <code>bufferedamountlow</code> listener paces the read loop to the exact speed of the
        recipient&apos;s network connection.
      </p>

      <h2 id="privacy-by-design">Why Privacy-by-Design Beats Privacy Policy Promises</h2>
      <p>
        Many file-sharing apps promise in their privacy policy that they &quot;delete your files
        after 24 hours.&quot; That still means your files sit on their servers for 24 hours. With{" "}
        <Link href="/projects/relay">Relay</Link>, privacy is an architectural constraint rather
        than a policy promise:
      </p>
      <ul>
        <li>
          <strong>Zero server-side file storage:</strong> The backend server has no S3 bucket, no
          upload endpoint, and no disk volume for files. Even if our server were subpoenaed or
          compromised, there are no stored files to leak.
        </li>
        <li>
          <strong>Consent boundaries:</strong> A peer in a room cannot silently dump files onto your
          device. The sender sends a lightweight metadata offer (filename, size, type), and the
          WebRTC data transfer only starts after the recipient explicitly clicks{" "}
          <strong>Accept</strong>.
        </li>
        <li>
          <strong>Ephemeral room state:</strong> Room presence is scoped to active socket
          connections with a dual-signal, explicit disconnect and heartbeat cleanup so rooms vanish
           cleanly when participants close their tabs.
        </li>
      </ul>

      <h2 id="faq">Frequently Asked Questions</h2>
      <p>
        <strong>Are WebRTC data channels encrypted by default?</strong>
        <br />
        Yes. Every WebRTC data channel is mandatorily encrypted end-to-end between the two browsers
        using DTLS (Datagram Transport Layer Security). Neither the signaling server nor STUN
        servers can read the payload.
      </p>
      <p>
        <strong>Why do you need backpressure control when sending files over WebRTC?</strong>
        <br />
        Reading a multi-hundred-megabyte file from disk is much faster than network upload speed.
        Monitoring <code>RTCDataChannel.bufferedAmountLowThreshold</code> prevents the sender&apos;s
        SCTP buffer from overflowing and dropping the channel.
      </p>
      <p>
        <strong>What happens when two peers are behind strict symmetric NATs?</strong>
        <br />
        Direct peer-to-peer hole punching via STUN fails on symmetric NATs (roughly 10% to 15% of
        enterprise or cellular networks), requiring a TURN relay server that forwards the
        DTLS-encrypted packets without decrypting them.
      </p>

      <p>
        Try <Link href="/projects/relay">Relay</Link> live across two devices at{" "}
        <a href="https://relay.thisistayyab.dev" target="_blank" rel="noopener noreferrer">
          relay.thisistayyab.dev
        </a>{" "}
        or read the <Link href="/projects/relay">full Relay architecture case study</Link>. Need help
        building a real-time WebSocket, WebRTC, or collaborative web product?{" "}
        <Link href="/contact">Get in touch</Link>.
      </p>
    </>
  )
}
