import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {ISpaceItem} from '../../../models/Space'

interface IProps {
  formData: ISpaceItem
  setFormData: Dispatch<SetStateAction<ISpaceItem>>
  isEditMode: boolean
  placeholder: string | undefined
}

const generateFloorString = (floorNum: number) => {
  if (floorNum < 0) {
    return `B${String(floorNum).slice(-1)}`
  }

  return String(floorNum)
}

export const generateFloorNum = (floorString: string) => {
  if (floorString && typeof floorString === 'string' && floorString[0].toUpperCase() === 'B') {
    const num = Number(floorString.slice(1))
    return -num
  }
  return Number(floorString)
}

function Floor({formData, setFormData, isEditMode, placeholder}: IProps) {
  const [floor, setFloor] = useState('')

  useEffect(() => {
    const floorString = generateFloorString(formData.placeFloor as number)
    setFloor(floorString)
  }, [formData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => {
      return {
        ...prev,
        placeFloor: e.target.value,
      }
    })
  }

  return <input type='text' value={floor} onChange={handleChange} disabled={!isEditMode} placeholder={placeholder} />
}

export default Floor
