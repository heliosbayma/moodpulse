import { FC, ReactNode } from 'react'

type DashboardLayoutProps = {
  children: ReactNode
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <main className="relative h-screen w-screen">
      <header className="border-black/10 h-[60px] border-b">header</header>
      <article>{children}</article>
    </main>
  )
}

export default DashboardLayout
