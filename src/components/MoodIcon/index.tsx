'use client'

import { MoodType } from '@prisma/client'
import Bad from '../../assets/icons/bad.svg'
import Great from '../../assets/icons/great.svg'
import Horrible from '../../assets/icons/horrible.svg'
import Ok from '../../assets/icons/ok.svg'
import Well from '../../assets/icons/well.svg'

const moodIcon = (mood: MoodType) => {
  switch (mood) {
    case MoodType.bad:
      return <Bad />
    case MoodType.great:
      return <Great />
    case MoodType.horrible:
      return <Horrible />
    case MoodType.ok:
      return <Ok />
    case MoodType.well:
      return <Well />
    default:
      throw new Error(`Invalid icon: ${mood}`)
  }
}

const MoodIcon = ({ mood }: { mood: MoodType }) => {
  return (
    <div className="flex h-9 w-9 scale-75 items-center justify-center rounded-full">
      {moodIcon(mood)}
    </div>
  )
}

export default MoodIcon
