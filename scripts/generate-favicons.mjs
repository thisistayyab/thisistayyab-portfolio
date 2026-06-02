/**
 * Generate favicon / PWA icons from repo-root favicon.png
 * Run: node scripts/generate-favicons.mjs
 * Requires ffmpeg.
 */
import { execSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const source = path.join(root, "favicon.png")
const appDir = path.join(root, "app")
const publicDir = path.join(root, "public")

const outputs = [
  { file: path.join(appDir, "icon.png"), size: 32 },
  { file: path.join(appDir, "apple-icon.png"), size: 180 },
  { file: path.join(publicDir, "favicon.ico"), size: 32, ico: true },
  { file: path.join(publicDir, "icon.png"), size: 192 },
  { file: path.join(publicDir, "apple-touch-icon.png"), size: 180 },
  { file: path.join(publicDir, "icon-512.png"), size: 512 },
]

function run(cmd) {
  execSync(cmd, { stdio: "inherit" })
}

if (!fs.existsSync(source)) {
  console.error(`Missing source: ${source}`)
  console.error("Place your logo as favicon.png in the project root, then re-run.")
  process.exit(1)
}

console.log(`Source: favicon.png\n`)

for (const { file, size, ico } of outputs) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  const scale = `scale=${size}:${size}:flags=lanczos`
  if (ico) {
    run(
      `ffmpeg -y -hide_banner -loglevel error -i "${source}" -vf "${scale}" -frames:v 1 "${file}"`,
    )
  } else {
    run(
      `ffmpeg -y -hide_banner -loglevel error -i "${source}" -vf "${scale}" -frames:v 1 -update 1 "${file}"`,
    )
  }
  console.log(`✓ ${path.relative(root, file)} (${size}×${size})`)
}

console.log("\nDone. Commit app/icon.png, app/apple-icon.png, and public/* icons.")
