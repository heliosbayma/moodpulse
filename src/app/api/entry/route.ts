import getUserByClerkId from '@/utils/auth'
import prisma from '@/utils/db'
import { User } from '@prisma/client'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'

export const POST = async () => {
  const user: User | null | undefined = await getUserByClerkId()

  if (!user) redirect('/')

  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      title: 'Entry of the day',
      content: 'How was your day?',
    },
  })

  return NextResponse.json({ data: entry })
}
