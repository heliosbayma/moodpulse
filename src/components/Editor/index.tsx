'use client'

import { useTransition } from 'react'
import { MoodType } from '@prisma/client'
import { FC, useEffect } from 'react'
import { useDebounce } from 'usehooks-ts'
import { updateEntry } from '@/utils/actions'
import MoodPicker from '../MoodPicker'
import { EditorProps } from '../types'
import { DEBOUNCE_TIME } from '../consts'
import { useEditor } from '@/app/hooks/useEditor'

const Editor: FC<EditorProps> = ({ entry, userId }) => {
  const { state, updateTitle, updateContent, updateMood, updateStatus } =
    useEditor(entry)

  const debouncedTitle = useDebounce<string>(
    state.entry?.title ?? '',
    DEBOUNCE_TIME,
  )
  const debouncedContent = useDebounce<string>(
    state.entry?.content ?? '',
    DEBOUNCE_TIME,
  )
  const debouncedMood = useDebounce<MoodType>(
    state.entry?.mood ?? 'great',
    DEBOUNCE_TIME,
  )
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (!entry) return

    updateStatus('loading')
    startTransition(() =>
      updateEntry(
        userId,
        entry.id,
        debouncedTitle,
        debouncedContent,
        debouncedMood,
      )
        .then((res) => {
          updateStatus('success')
        })
        .catch((error) => {
          console.error(error)
          updateStatus('error')
        }),
    )
  }, [debouncedTitle, debouncedContent, debouncedMood])

  if (!entry) return <h1>Sorry, entry not available</h1>

  return (
    <div>
      <sub className={state.message.style}>{state.message.content}</sub>
      <input
        className="w-full outline-none"
        value={state.entry?.title}
        onChange={updateTitle}
      />
      <MoodPicker initialMood={entry.mood} onMoodChange={updateMood} />
      <textarea
        className="h-96 w-full outline-none"
        value={state.entry?.content}
        onChange={updateContent}
      />
    </div>
  )
}

export default Editor
