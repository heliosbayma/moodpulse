'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/utils/db'
import { JournalEntry, Prisma, MoodType } from '@prisma/client'

interface EntryData {
  id: string
  title: string
  content: string
  mood: MoodType
}

interface EntryResponse {
  error: boolean
  code: number
  message: string
  data?: EntryData
}

export async function createNewEntry(userId: string): Promise<EntryResponse> {
  try {
    const entry = await prisma.journalEntry.create({
      data: {
        userId,
        title: 'Entry of the day',
        content: 'How was your day?',
      },
    })

    revalidatePath('/journal')

    return {
      error: false,
      code: 200,
      message: 'OK',
      data: entry,
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(error)
      return {
        error: true,
        code: parseInt(error.code),
        message: 'Internal Server Error',
      }
    } else {
      console.error(error)
      return { error: true, code: 500, message: 'Internal Server Error' }
    }
  }
}

export async function updateEntry(
  userId: string,
  id: string,
  title: string,
  content: string,
  mood: MoodType,
): Promise<EntryResponse> {
  try {
    const updatedEntry: JournalEntry = await prisma.journalEntry.update({
      where: {
        unique_journal_entry: {
          userId,
          id,
        },
      },
      data: {
        title,
        content,
        mood,
      },
    })

    revalidatePath('/journal')

    return {
      error: false,
      code: 200,
      message: 'OK',
      data: {
        id: updatedEntry.id,
        title: updatedEntry.title,
        content: updatedEntry.content,
        mood: updatedEntry.mood,
      },
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(error)
      return {
        error: true,
        code: parseInt(error.code),
        message: 'Internal Server Error',
      }
    } else {
      console.error(error)
      return { error: true, code: 500, message: 'Internal Server Error' }
    }
  }
}

export async function deleteEntry(
  userId: string,
  id: string,
): Promise<EntryResponse> {
  try {
    const deletedEntry: JournalEntry = await prisma.journalEntry.delete({
      where: {
        unique_journal_entry: {
          userId,
          id,
        },
      },
    })

    revalidatePath('/journal')

    return {
      error: false,
      code: 200,
      message: 'OK',
      data: {
        id: deletedEntry.id,
        title: deletedEntry.title,
        content: deletedEntry.content,
        mood: deletedEntry.mood,
      },
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(error)
      return {
        error: true,
        code: parseInt(error.code),
        message: 'Internal Server Error',
      }
    } else {
      console.error(error)
      return { error: true, code: 500, message: 'Internal Server Error' }
    }
  }
}
