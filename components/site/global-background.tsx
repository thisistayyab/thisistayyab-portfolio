export function GlobalBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-site-base" />
      <div className="absolute inset-0 bg-site-ambient" />
      <div className="absolute inset-0 bg-site-stars opacity-55" />
      <div className="absolute inset-0 bg-site-stars-fine bg-[length:220px_220px] opacity-30" />
    </div>
  )
}
