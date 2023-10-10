import Editor from '@/components/Editor'
import { getUserByClerkId } from '@/utils/auth'
import prisma from '@/utils/db'
import { JournalEntry, User } from '@prisma/client'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { FC } from 'react'

type Params = {
  params: {
    id: string
  }
}

const JournalEntryPage: FC<Params> = async ({ params }) => {
  const user: User | null | undefined = await getUserByClerkId()
  if (!user) redirect('/')

  const userId = user.id
  const entry = await getEntry(params.id)

  return (
    <>
      <Link href="/journal">Back</Link>
      <h1>JournalEntryPage</h1>
      <Editor entry={entry} userId={userId} />
    </>
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
