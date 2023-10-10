'use client'

import { useTransition } from 'react'
import { JournalEntry } from '@prisma/client'
import { ChangeEvent, FC, useEffect, useReducer, useState } from 'react'
import { useDebounce } from 'usehooks-ts'
import { updateEntry } from '@/utils/actions'

interface State {
  status: 'idle' | 'loading' | 'error' | 'success'
  message: {
    content: string
    style: string
  }
}

type Action = {
  type: 'SET_STATUS'
  payload: 'idle' | 'loading' | 'error' | 'success'
}

const initialState: State = {
  status: 'idle',
  message: {
    content: '',
    style: 'text-gray-300',
  },
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_STATUS':
      let message = initialState.message
      if (action.payload === 'idle') {
        message.content = '...'
      } else if (action.payload === 'loading') {
        message.content = 'Saving...'
      } else if (action.payload === 'error') {
        message.content = 'Could not save journal entry'
        message.style = 'text-red-500'
      } else if (action.payload === 'success') {
        message.content = 'Journal entry is saved'
      }
      return { ...state, status: action.payload, message }
    default:
      return state
  }
}

interface EditorProps {
  entry: JournalEntry | null
  userId: string
}

const Editor: FC<EditorProps> = ({ entry, userId }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [title, setTitle] = useState<string>(entry?.title ?? '')
  const [content, setContent] = useState<string>(entry?.content ?? '')
  const debouncedTitle = useDebounce<string>(title, 1000)
  const debouncedContent = useDebounce<string>(content, 1000)
  const [isPending, startTransition] = useTransition()

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_STATUS', payload: 'idle' })
    setTitle(event.target.value)
  }

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'SET_STATUS', payload: 'idle' })
    setContent(event.target.value)
  }

  useEffect(() => {
    if (!entry) return

    dispatch({ type: 'SET_STATUS', payload: 'loading' })
    startTransition(() =>
      updateEntry(userId, entry.id, debouncedTitle, debouncedContent)
        .then((res) => {
          dispatch({ type: 'SET_STATUS', payload: 'success' })
        })
        .catch((error) => {
          console.error(error)
          dispatch({ type: 'SET_STATUS', payload: 'error' })
        }),
    )
  }, [debouncedTitle, debouncedContent])

  if (!entry) return <h1>Sorry, entry not available</h1>

  return (
    <div>
      <sub className={state.message.style}>{state.message.content}</sub>
      <input
        className="w-full outline-none"
        value={title}
        onChange={handleTitleChange}
      />
      <textarea
        className="h-96 w-full outline-none"
        value={content}
        onChange={handleContentChange}
      />
    </div>
  )
}

export default Editor
