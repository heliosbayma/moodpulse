import getUserByClerkId from '@/utils/auth'
import JournalEntryCard from '@/components/JournalEntryCard'
import prisma from '@/utils/db'
import { JournalEntry, MoodEntry } from '@prisma/client'
import NewJournalEntryButton from '@/components/NewJournalEntryButton'

const getEntries = async () => {
  const user = await getUserByClerkId()
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

const JournalPage = async () => {
  const entries = await getEntries()
  const journalEntries: JournalEntry[] = entries.journalEntries
  const moodEntries: MoodEntry[] = entries.moodEntries

  return (
    <>
      <section>moodboard</section>
      <h2 className="mb-8 text-3xl">journal</h2>
      <NewJournalEntryButton />
      <section className="grid grid-cols-3 gap-4">
        {journalEntries.map((entry) => (
          <JournalEntryCard key={entry.id} journalEntry={entry} />
        ))}
      </section>
    </>
  )
}

export default JournalPage
