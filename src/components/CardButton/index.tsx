'use client'

import { deleteEntry } from '@/utils/api'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

interface CardButtonProps {
  label: string
  id: string
  className?: string
}

const CardButton: FC<CardButtonProps> = ({ label, id, className = '' }) => {
  const router = useRouter()

  return (
    <button
      className={className}
      onClick={() => handleButtonClick(label, id, router)}
    >
      {label}
    </button>
  )
}

export default CardButton

const handleButtonClick = (
  label: string,
  id: string,
  router: AppRouterInstance,
) => {
  if (label === 'Open') {
    handleOpen(id, router)
  } else if (label === 'Delete') {
    handleDelete(id)
  }
}

const handleOpen = (id: string, router: AppRouterInstance) => {
  router.push(`/journal/${id}`)
}

const handleDelete = (id: string) => {
  deleteEntry(id)
}
