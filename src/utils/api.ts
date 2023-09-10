const createURL = (path: string) => {
  return window.location.origin + path
}

export const createNewEntry = async () => {
  const res = await fetch(
    new Request(createURL('/api/entry'), {
      method: 'POST',
      body: JSON.stringify({ content: 'new entry' }),
    }),
  )

  if (res.ok) {
    return res.json()
  } else {
    throw new Error('Something went wrong on API server!')
  }
}
