import { FC } from 'react'

type Params = {
  id: string
  content: string
}

const JournalEntryPage: FC<Params> = ({ id, content }) => {
  return (
    <div>
      <h1>JournalEntryPage</h1>
      <p>{id}</p>
      <p>{content}</p>
    </div>
  )
}

export default JournalEntryPage
