export function NavOrb() {
  return (
    <span
      className="relative flex h-4 w-4 shrink-0 items-center justify-center"
      aria-hidden="true"
    >
      <span className="absolute inset-0 rounded-full bg-blue-400/40 blur-[4px]" />
      <span className="relative h-3 w-3 rounded-full bg-gradient-to-br from-blue-200 via-purple-400 to-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.75)]" />
    </span>
  )
}
