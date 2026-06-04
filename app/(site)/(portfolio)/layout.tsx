import { PortfolioMotionLayout } from "@/components/motion/portfolio-motion-layout"

export default function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <PortfolioMotionLayout>{children}</PortfolioMotionLayout>
}
