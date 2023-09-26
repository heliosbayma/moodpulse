import getUserByClerkId from '@/utils/auth'
import prisma from '@/utils/db'
import { User } from '@prisma/client'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'

export const POST = async () => {
  const user: User | null | undefined = await getUserByClerkId()

  //  temporaryly redirects to home page if user doesn't exist in db,
  //  because if the user can see this route, it exists at least in clerk db
  if (!user) redirect('/')

  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      title: 'Entry of the day',
      content: 'How was your day?',
    },
  })

  // Next.js will soon have a way to revalidate data which doesn't use fetch api
  // right now it only works on it's canary version
  // revalidatePath('/journal')

  return NextResponse.json({ data: entry })
}
