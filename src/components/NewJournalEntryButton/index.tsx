'use client'

import { createNewEntry } from '@/utils/api'
import { useRouter } from 'next/navigation'

const NewJournalEntryButton = () => {
  const router = useRouter()

  const handleNewJournalEntryClick = async () => {
    const data = await createNewEntry()
    router.push(`/journal/${data.id}`)
  }

  return (
    <button
      className="w-full rounded-full bg-accent px-4 py-1 text-sm font-medium uppercase text-text-primary
      ring-accent transition duration-300 ease-in-out
      hover:bg-secondary hover:ring-4 focus:bg-secondary focus:ring-4 active:bg-secondary active:ring-4 sm:w-fit"
      onClick={handleNewJournalEntryClick}
    >
      New entry
    </button>
  )
}

export default NewJournalEntryButton
