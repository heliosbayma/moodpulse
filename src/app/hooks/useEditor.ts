import {
  Action,
  State,
  Status,
  StatusMessage,
  UpdateEntryPayload,
} from '@/components/types'
import { JournalEntry, MoodType } from '@prisma/client'
import { ChangeEvent, useReducer } from 'react'

const initialState: State = {
  status: 'idle',
  message: {
    content: '...',
    style: 'text-gray-300',
  },
  entry: {
    title: '',
    content: '',
    mood: 'great',
    createdAt: new Date(),
    updatedAt: new Date(),
  } as JournalEntry,
}

const getStatusMessage = (status: Status): StatusMessage => {
  switch (status) {
    case 'idle':
      return initialState.message
    case 'loading':
      return { ...initialState.message, content: 'Saving...' }
    case 'error':
      return { content: 'Could not save journal entry', style: 'text-red-500' }
    case 'success':
      return { ...initialState.message, content: 'Journal entry is saved' }
    default:
      throw new Error(`Unknown status: ${status}`)
  }
}

const updateReducerEntry = (
  state: State,
  payload: UpdateEntryPayload,
): State => {
  const { status, ...entry } = payload
  return {
    ...state,
    entry: { ...state.entry, ...entry } as JournalEntry,
    status,
    message: getStatusMessage(status),
  }
}

const reducer = (state: State, action: Action): State => {
  const tipo = action.type
  switch (tipo) {
    case 'SET_TITLE':
      return updateReducerEntry(state, {
        title: action.payload.title,
        status: action.payload.status,
      })
    case 'SET_CONTENT':
      return updateReducerEntry(state, {
        content: action.payload.content,
        status: action.payload.status,
      })
    case 'SET_MOOD':
      return updateReducerEntry(state, {
        mood: action.payload.mood,
        status: action.payload.status,
      })
    case 'SET_STATUS':
      return updateReducerEntry(state, {
        status: action.payload.status,
      })
    default:
      throw new Error(`Unknown action type: ${tipo}`)
  }
}

const init = (entry: JournalEntry) => {
  return { ...initialState, entry: entry ?? initialState.entry }
}

export const useEditor = (entry: JournalEntry) => {
  const [state, dispatch] = useReducer(reducer, entry, init)

  const updateTitle = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'SET_TITLE',
      payload: { title: event.target.value, status: 'idle' },
    })
  }

  const updateContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: 'SET_CONTENT',
      payload: { content: event.target.value, status: 'idle' },
    })
  }

  const updateMood = (newMood: MoodType) => {
    dispatch({
      type: 'SET_MOOD',
      payload: { mood: newMood, status: 'idle' },
    })
  }

  const updateStatus = (status: Status) => {
    dispatch({ type: 'SET_STATUS', payload: { status } })
  }

  return {
    state,
    updateTitle,
    updateContent,
    updateMood,
    updateStatus,
  }
}
