'use client'

import { createNewEntry } from '@/utils/api'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { useWindowSize } from '@/hooks/useWindowSize'
import FixedBottomBar from '@/components/FixedBottomBar'

const NewJournalEntryButton = () => {
  const router = useRouter()
  const { width } = useWindowSize()

  const handleNewJournalEntryClick = async () => {
    const data = await createNewEntry()
    router.push(`/journal/${data.data?.id}`)
  }

  return (
    <>
      {width > 640 ? (
        <Button onClick={handleNewJournalEntryClick} />
      ) : (
        <FixedBottomBar>
          <Button onClick={handleNewJournalEntryClick} />
        </FixedBottomBar>
      )}
    </>
  )
}

export default NewJournalEntryButton

type OnClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => void

interface ButtonProps {
  onClick: OnClickHandler
  className?: string
}

const Button: FC<ButtonProps> = ({ onClick, className = '' }) => {
  return (
    <button
      className={`w-full rounded-full bg-accent px-4 py-1 text-sm font-medium uppercase text-text-primary transition duration-300 ease-in-out hover:bg-secondary focus:bg-secondary active:bg-secondary sm:w-fit
      ${className}`}
      onClick={onClick}
    >
      New entry
    </button>
  )
}
