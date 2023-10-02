import { getUserByClerkId } from '@/utils/auth'
import JournalEntryCard from '@/components/JournalEntryCard'
import prisma from '@/utils/db'
import { JournalEntry, MoodEntry, User } from '@prisma/client'
import NewJournalEntryButton from '@/components/NewJournalEntryButton'
import { redirect } from 'next/navigation'

const JournalPage = async () => {
  const entries = await getEntries()
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
      <NewJournalEntryButton />
      <section className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 2xl:grid-cols-4">
        {journalEntries.map((entry) => (
          <JournalEntryCard key={entry.id} journalEntry={entry} />
        ))}
      </section>
    </>
  )
}

export default JournalPage

const getEntries = async () => {
  const user: User | null | undefined = await getUserByClerkId()

  if (!user) redirect('/')

  const today = new Date()
  const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30))

  const moodEntries = await prisma.moodEntry.findMany({
    where: {
      userId: user.id,
      createdAt: {
        gte: thirtyDaysAgo,
      },
    },
  })

  const journalEntries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return { journalEntries, moodEntries }
}
