interface EntryData {
  id: string
  title: string
  content: string
}

interface EntryResponse {
  error: boolean
  code: number
  message: string
  data?: EntryData
}

const createURL = (path: string) => {
  return window.location.origin + path
}

export const createNewEntry = async (): Promise<EntryResponse> => {
  try {
    const res = await fetch(
      new Request(createURL('/api/entry'), {
        method: 'POST',
        body: JSON.stringify({ content: 'new entry' }),
      }),
    )

    if (res.ok) {
      const data = await res.json()

      return {
        error: false,
        code: res.status,
        message: res.statusText,
        data: data.data,
      }
    } else {
      return { error: true, code: res.status, message: res.statusText }
    }
  } catch (error) {
    console.error(error)
    return { error: true, code: 500, message: 'Internal Server Error' }
  }
}

export const updateEntry = async (
  id: string,
  title: string,
  content: string,
): Promise<EntryResponse> => {
  try {
    const res = await fetch(
      new Request(createURL(`/api/entry/${id}`), {
        method: 'PATCH',
        body: JSON.stringify({ title, content }),
      }),
    )

    if (res.ok) {
      const data = await res.json()
      return {
        error: false,
        code: res.status,
        message: res.statusText,
        data: data.data,
      }
    } else {
      return { error: true, code: res.status, message: res.statusText }
    }
  } catch (error) {
    console.error(error)
    return { error: true, code: 500, message: 'Internal Server Error' }
  }
}

export const deleteEntry = async (id: string): Promise<EntryResponse> => {
  try {
    const res = await fetch(
      new Request(createURL(`/api/entry/${id}`), {
        method: 'DELETE',
      }),
    )

    if (res.ok) {
      const data = await res.json()
      return {
        error: false,
        code: res.status,
        message: res.statusText,
        data: data.data,
      }
    } else {
      return { error: true, code: res.status, message: res.statusText }
    }
  } catch (error) {
    console.error(error)
    return { error: true, code: 500, message: 'Internal Server Error' }
  }
}
