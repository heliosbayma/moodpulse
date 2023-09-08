import { JournalEntry } from '@prisma/client'
import { FC } from 'react'

type JournalEntryCardProps = {
  journalEntry: JournalEntry
}

const JournalEntryCard: FC<JournalEntryCardProps> = ({ journalEntry }) => {
  const date = new Date(journalEntry.createdAt).toDateString()

  return (
    <>
      <h1>Entry title</h1>
      <p>{journalEntry.content}</p>
      <p className="px-4 py-5 sm:px-6">{date}</p>
    </>
  )
}

export default JournalEntryCard
