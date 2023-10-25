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
      <option value="well">Well</option>
      <option value="ok">Ok</option>
      <option value="bad">Bad</option>
      <option value="horrible">Horrible</option>
    </select>
  )
}

export default MoodPicker
