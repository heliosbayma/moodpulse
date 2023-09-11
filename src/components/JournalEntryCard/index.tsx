import { JournalEntry } from '@prisma/client'
import { FC } from 'react'
import CardButton from '@/components/CardButton'

type JournalEntryCardProps = {
  journalEntry: JournalEntry
}

const JournalEntryCard: FC<JournalEntryCardProps> = ({ journalEntry }) => {
  const date = new Date(journalEntry.createdAt).toDateString()

  return (
    <article
      className="bg-white hover:bg-slate-50 flex w-full flex-col overflow-hidden rounded-lg px-6 py-4
      shadow-lg"
    >
      <time className="text-gray-300 py-1 text-xs font-semibold uppercase tracking-wide">
        {date}
      </time>
      <h3 className="truncate text-lg font-semibold leading-tight">
        {journalEntry.title}
      </h3>
      <p className="mt-1">{journalEntry.content}</p>
      <div className="mt-4 flex justify-between">
        <CardButton
          label="Open"
          id={journalEntry.id}
          className="w-fit rounded bg-secondary px-3 py-1 text-xs uppercase text-text-primary transition duration-300 ease-in-out hover:bg-accent focus:bg-accent active:bg-accent sm:w-fit"
        />
        <CardButton
          label="Delete"
          id={journalEntry.id}
          className="text-gray-400 hover:text-red-600 focus:text-red-600text-red-600 active:text-red-600 w-fit rounded-sm px-3 py-1 text-xs uppercase transition duration-300 ease-in-out"
        />
      </div>
    </article>
  )
}

export default JournalEntryCard
