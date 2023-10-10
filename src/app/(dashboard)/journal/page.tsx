import { getUserByClerkId } from '@/utils/auth'
import JournalEntryCard from '@/components/JournalEntryCard'
import prisma from '@/utils/db'
import { JournalEntry, MoodEntry, User } from '@prisma/client'
import NewJournalEntryButton from '@/components/NewJournalEntryButton'
import { redirect } from 'next/navigation'

const JournalPage = async () => {
  const user: User | null | undefined = await getUserByClerkId()
  if (!user) redirect('/')

  const userId = user.id
  const entries = await getEntries(userId)
  const journalEntries: JournalEntry[] = entries.journalEntries
  const moodEntries: MoodEntry[] = entries.moodEntries

  return (
    <>
      {moodEntries && moodEntries.length > 0 && (
        <>
          <h2 className="mb-2 mr-8 text-3xl">Moodboard</h2>
          <section className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 2xl:grid-cols-4">
            {moodEntries.map((entry) => (
              <div key={entry.id} />
            ))}
          </section>
        </>
      )}
      <h2 className="mb-2 mr-8 text-3xl">Journal</h2>
      <NewJournalEntryButton userId={userId} />
      <section className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 2xl:grid-cols-4">
        {journalEntries.map((entry) => (
          <JournalEntryCard
            key={entry.id}
            journalEntry={entry}
            userId={userId}
          />
        ))}
      </section>
    </>
  )
}

export default JournalPage

const getEntries = async (id: string) => {
  const today = new Date()
  const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30))

  const moodEntries = await prisma.moodEntry.findMany({
    where: {
      userId: id,
      createdAt: {
        gte: thirtyDaysAgo,
      },
    },
  })

  const journalEntries = await prisma.journalEntry.findMany({
    where: {
      userId: id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return { journalEntries, moodEntries }
}
