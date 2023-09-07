import prisma from '@/utils/db'
import getUserByClerkId from '@/utils/auth'

const getEntries = async () => {
  const user = await getUserByClerkId()
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return entries
}

const JournalPage = async () => {
  const entries = await getEntries()
  console.log('entries', entries)
  return (
    <>
      <section>moodboard</section>
      <section>journal</section>
    </>
  )
}

export default JournalPage
