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
      className="rounded-xl bg-accent px-4 py-1 text-text-primary"
      onClick={handleNewJournalEntryClick}
    >
      New Journal Entry
    </button>
  )
}

export default NewJournalEntryButton
