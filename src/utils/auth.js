import { auth } from '@clerk/nextjs'
import prisma from './db'

export const getUserByClerkId = async (select = { id: true }) => {
  const { userId } = await auth()

  const user = await prisma.user
    .findUniqueOrThrow({
      where: {
        clerkId: userId,
      },
      select,
    })
    .catch(() => {
      return null
    })

  return user
}
