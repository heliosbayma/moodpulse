'use server'

import { revalidatePath } from 'next/cache'

type Path = string

export const update = (paths: Path[] = []) => {
  paths.forEach((p) => revalidatePath(p))
}
