import { FC, TransitionStartFunction } from 'react'

interface ButtonProps {
  onClick: () => void
  startTransition: TransitionStartFunction
  className?: string
  children: React.ReactNode
}

const ServerActionButton: FC<ButtonProps> = ({
  onClick,
  startTransition,
  className = '',
  children,
}) => {
  return (
    <button
      className={`${className}`}
      onClick={() => startTransition(() => onClick())}
    >
      {children}
    </button>
  )
}

export default ServerActionButton
