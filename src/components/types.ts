import { MoodType, JournalEntry } from '@prisma/client'

export type StatusMessage = {
  content: string
  style: string
}

export type Status = 'idle' | 'loading' | 'error' | 'success'

export type UpdateEntryPayload = {
  title?: string
  content?: string
  mood?: MoodType
  status: Status
}

export type State = {
  status: Status
  message: StatusMessage
  entry: JournalEntry | null
}

export type Action =
  | {
      type: 'SET_TITLE'
      payload: {
        title: string
        status: 'idle' | 'loading' | 'error' | 'success'
      }
    }
  | {
      type: 'SET_CONTENT'
      payload: {
        content: string
        status: 'idle' | 'loading' | 'error' | 'success'
      }
    }
  | {
      type: 'SET_MOOD'
      payload: {
        mood: MoodType
        status: 'idle' | 'loading' | 'error' | 'success'
      }
    }
  | {
      type: 'SET_STATUS'
      payload: {
        status: 'idle' | 'loading' | 'error' | 'success'
      }
    }

export type EditorProps = {
  entry: JournalEntry
  userId: string
}
