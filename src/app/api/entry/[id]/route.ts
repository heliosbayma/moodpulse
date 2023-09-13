import getUserByClerkId from '@/utils/auth'
import prisma from '@/utils/db'
import { JournalEntry, User } from '@prisma/client'
import { NextResponse } from 'next/server'

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const { content } = await request.json()

  const user: User | null | undefined = await getUserByClerkId()
  if (!user) throw new Error('User not found')

  const updatedEntry: JournalEntry = await prisma.journalEntry.update({
    where: {
      unique_journal_entry: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  })

  return NextResponse.json({ data: { updatedEntry } })
}
