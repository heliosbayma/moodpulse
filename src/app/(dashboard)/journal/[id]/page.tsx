import Editor from '@/components/Editor'
import getUserByClerkId from '@/utils/auth'
import prisma from '@/utils/db'
import { JournalEntry } from '@prisma/client'
import { FC } from 'react'

type Params = {
  params: {
    id: string
  }
}

const JournalEntryPage: FC<Params> = async ({ params }) => {
  const entry = await getEntry(params.id)

  return (
    <div>
      <h1>JournalEntryPage</h1>
      <Editor entry={entry} />
    </div>
  )
}

export default JournalEntryPage

const getEntry = async (id: string) => {
  const user = await getUserByClerkId()
  if (!user) throw new Error('User not found')

  const entry: JournalEntry | null = await prisma.journalEntry.findUnique({
    where: {
      unique_journal_entry: {
        userId: user.id,
        id,
      },
    },
  })

  return entry
}
