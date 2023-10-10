'use client'

import { useTransition } from 'react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { deleteEntry } from '@/utils/actions'

interface CardButtonProps {
  label: string
  id: string
  userId: string
  className?: string
}

const CardButton: FC<CardButtonProps> = ({
  label,
  id,
  userId,
  className = '',
}) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  return (
    <button
      className={className}
      onClick={() =>
        startTransition(() => handleButtonClick(label, id, userId, router))
      }
    >
      {label}
    </button>
  )
}

export default CardButton

const handleButtonClick = (
  label: string,
  id: string,
  userId: string,
  router: AppRouterInstance,
) => {
  if (label === 'Open') {
    router.push(`/journal/${id}`)
  } else if (label === 'Delete') {
    deleteEntry(userId, id)
  }
}
