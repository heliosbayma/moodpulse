import Loader from '@/components/Loader'
import prisma from '@/utils/db'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

async function createNewUser() {
  const user = await currentUser()

  const match = await prisma.user.findUnique({
    where: {
      clerkId: user?.id as string,
    },
  })

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user?.id as string,
        email: user?.emailAddresses[0].emailAddress as string,
      },
    })
  }

  redirect('/journal')
}

const NewUserPage = () => {
  createNewUser()

  return (
    <section className="flex h-screen w-screen items-center justify-center ">
      <Loader text="Setting up your journal..." />
    </section>
  )
}

export default NewUserPage
