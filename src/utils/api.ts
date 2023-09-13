const createURL = (path: string) => {
  return window.location.origin + path
}

export const createNewEntry = async () => {
  try {
    const res = await fetch(
      new Request(createURL('/api/entry'), {
        method: 'POST',
        body: JSON.stringify({ content: 'new entry' }),
      }),
    )

    if (res.ok) {
      return { error: false, code: res.status, message: res.json() }
    } else {
      return { error: true, code: res.status, message: res.statusText }
    }
  } catch (error) {
    console.error(error)
    return { error: true, code: 500, message: 'Internal Server Error' }
  }
}

export const updateEntry = async (id: string, content: string) => {
  try {
    const res = await fetch(
      new Request(createURL(`/api/entry/${id}`), {
        method: 'PATCH',
        body: JSON.stringify({ content }),
      }),
    )

    if (res.ok) {
      return { error: false, code: res.status, message: res.json() }
    } else {
      return { error: true, code: res.status, message: res.statusText }
    }
  } catch (error) {
    console.error(error)
    return { error: true, code: 500, message: 'Internal Server Error' }
  }
}
