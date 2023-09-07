import prisma from '@/utils/db'
import getUserByClerkId from '@/utils/auth'

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
  console.log('moodboard', entries.moodEntries)
  console.log('entries', entries.journalEntries)
  return (
    <>
      <section>moodboard</section>
      <section>journal</section>
    </>
  )
}

export default JournalPage
