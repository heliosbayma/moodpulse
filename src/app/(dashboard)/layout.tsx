import { FC, ReactNode } from 'react'

type DashboardLayoutProps = {
  children: ReactNode
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  return <section>{children}</section>
}

export default DashboardLayout
