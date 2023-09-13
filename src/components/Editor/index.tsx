'use client'

import { updateEntry } from '@/utils/api'
import { JournalEntry } from '@prisma/client'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useDebounce } from 'usehooks-ts'

interface EditorProps {
  entry: JournalEntry | null
}

const Editor: FC<EditorProps> = ({ entry }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [content, setContent] = useState<string>(entry?.content ?? '')
  const debouncedValue = useDebounce<string>(content, 2000)

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)
  }

  useEffect(() => {
    setLoading(true)
    updateEntry(entry?.id ?? '', debouncedValue).then((res) => {
      if (res) {
        setLoading(false)
      }
    })
  }, [debouncedValue, entry?.id])

  if (!entry) return <h1>Sorry, entry not available</h1>

  return (
    <div>
      <sub className="text-gray-300">
        {loading ? 'saving your changes...' : 'journal entry saved'}
      </sub>
      <textarea
        className="h-96 w-full outline-none"
        value={content}
        onChange={handleChange}
      />
    </div>
  )
}

export default Editor
