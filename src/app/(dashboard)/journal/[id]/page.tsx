import { FC } from 'react'

type Params = {
  id: string
  content: string
}

const EntryPage: FC<Params> = ({ id, content }) => {
  return (
    <div>
      <h1>EntryPage</h1>
      <p>{id}</p>
      <p>{content}</p>
    </div>
  )
}

export default EntryPage
