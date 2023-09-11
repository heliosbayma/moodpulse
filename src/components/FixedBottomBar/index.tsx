import { FC } from 'react'

interface FixedBottomBarProps {
  children: React.ReactNode
}

const FixedBottomBar: FC<FixedBottomBarProps> = ({ children }) => {
  return (
    <div className="fixed bottom-0 left-0 z-10 flex h-fit w-full justify-center bg-background-primary py-3">
      <div className="flex w-[calc(100%-5rem)]">{children}</div>
    </div>
  )
}

export default FixedBottomBar
