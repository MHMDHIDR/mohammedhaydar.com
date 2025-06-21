import Container from './Container'
import { cn } from '@/lib/utils'
interface PageLayoutProps {
  children: React.ReactNode
  className?: string
}

export default function PageLayout({ children, className }: PageLayoutProps) {
  return <Container className={cn('w-full', className)}>{children}</Container>
}
