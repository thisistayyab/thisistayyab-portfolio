import { PortfolioMotionLayout } from "@/components/motion/portfolio-motion-layout"

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <PortfolioMotionLayout>{children}</PortfolioMotionLayout>
}
