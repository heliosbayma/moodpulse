import { getUserByClerkId } from '@/utils/auth'
import { update } from '@/utils/actions'
import prisma from '@/utils/db'
import { JournalEntry, User } from '@prisma/client'
import { NextResponse } from 'next/server'

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const { title, content } = await request.json()

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
      title,
      content,
    },
  })

  update(['/journal'])

  return NextResponse.json({ data: { updatedEntry } })
}

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const user: User | null | undefined = await getUserByClerkId()
  if (!user) throw new Error('User not found')

  const deletedEntry: JournalEntry = await prisma.journalEntry.delete({
    where: {
      unique_journal_entry: {
        userId: user.id,
        id: params.id,
      },
    },
  })

  update(['/journal'])

  return NextResponse.json({ data: { deletedEntry } })
}
