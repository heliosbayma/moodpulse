import { JournalEntry } from '@prisma/client'
import { FC } from 'react'

type JournalEntryCardProps = {
  journalEntry: JournalEntry
}

const JournalEntryCard: FC<JournalEntryCardProps> = ({ journalEntry }) => {
  const date = new Date(journalEntry.createdAt).toDateString()

  return (
    <article className="bg-white w-100 flex flex-col overflow-hidden rounded-lg px-6 py-4 shadow-lg">
      <time className="text-gray-300 py-1 text-xs font-semibold uppercase tracking-wide">
        {date}
      </time>
      <h3 className="truncate text-lg font-semibold leading-tight">
        {journalEntry.title}
      </h3>
      <p className="mt-1">{journalEntry.content}</p>
    </article>
  )
}

export default JournalEntryCard
