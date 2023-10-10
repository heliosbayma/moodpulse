'use client'

import { useTransition } from 'react'
import { createNewEntry } from '@/utils/actions'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import FixedBottomBar from '@/components/FixedBottomBar'
import ServerActionButton from '../ServerActionButton'

const NewJournalEntryButton = ({ userId }: { userId: string }) => {
  const router = useRouter()
  //const { width } = useWindowSize()
  const [isPending, startTransition] = useTransition()

  const handleNewJournalEntryClick = async () => {
    const data = await createNewEntry(userId)

    if (data.data?.id) router.push(`/journal/${data.data?.id}`)
    else router.push(`/`)
  }

  return (
    <>
      <ServerActionButton
        onClick={handleNewJournalEntryClick}
        startTransition={startTransition}
        className="w-full rounded-full bg-accent px-4 py-1 text-sm font-medium uppercase text-text-primary transition duration-300 ease-in-out hover:bg-secondary focus:bg-secondary active:bg-secondary sm:w-fit"
      >
        New entry
      </ServerActionButton>
      {/* {width > 640 ? (
        <Button
          onClick={handleNewJournalEntryClick}
          startTransition={startTransition}
        />
      ) : (
        <FixedBottomBar>
          <Button
            onClick={handleNewJournalEntryClick}
            startTransition={startTransition}
          />
        </FixedBottomBar>
      )} */}
    </>
  )
}

export default NewJournalEntryButton
