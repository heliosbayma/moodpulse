import { UserButton } from '@clerk/nextjs'
import { FC, ReactNode } from 'react'

type DashboardLayoutProps = {
  children: ReactNode
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <main className="relative h-screen w-screen">
      <header className="border-black/10 h-[60px] border-b">
        <div className="flex h-full w-full  items-center justify-end px-6">
          <UserButton />
        </div>
      </header>
      <article className="max-w-screen-2k m-auto flex flex-col px-4 py-10 md:px-10">
        {children}
      </article>
    </main>
  )
}

export default DashboardLayout
