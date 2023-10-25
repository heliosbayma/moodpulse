import { useState } from 'react'
import { MoodType } from '@prisma/client'

interface MoodPickerProps {
  initialMood: MoodType
  onMoodChange: (mood: MoodType) => void
}

const MoodPicker = ({ initialMood, onMoodChange }: MoodPickerProps) => {
  const [mood, setMood] = useState(initialMood)

  const handleMoodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMood = event.target.value as MoodType
    setMood(newMood)
    onMoodChange(newMood)
  }

  return (
    <select value={mood} onChange={handleMoodChange}>
      <option value="great">Great</option>
      <option value="good">Good</option>
      <option value="ok">OK</option>
      <option value="bad">Bad</option>
      <option value="terrible">Terrible</option>
    </select>
  )
}

export default MoodPicker
