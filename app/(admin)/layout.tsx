export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative z-[1] min-h-full bg-background">{children}</div>
  )
}
