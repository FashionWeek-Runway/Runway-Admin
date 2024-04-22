import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react'
import {ActionIcon} from '@mantine/core'
import {TimeInput} from '@mantine/dates'
import {IconClock} from '@tabler/icons-react'
import * as S from './OperationHour.styled'
import {ISpaceItem} from '../../../../models/Space'

export interface IMatchTimeName {
  weekday_start: string
  weekday_end: string
  weekend_start: string
  weekend_end: string
  [key: string]: string
}

export interface ITime {
  weekday_start: string
  weekday_end: string
  weekend_start: string
  weekend_end: string
}

interface IProps {
  formData: ISpaceItem
  setFormData: Dispatch<SetStateAction<ISpaceItem>>
  isEditMode: boolean
}

const initialTime = {
  weekday_start: '00',
  weekday_end: '00',
  weekend_start: '00',
  weekend_end: '00',
}

const parseTimeString = (weekdayStart: string, weekdayEnd: string, weekendStart: string, weekendEnd: string) => {
  const weekday_start = weekdayStart
    .split(':')
    .map(val => String(val).padStart(2, '0'))
    .join(':')
  const weekday_end = weekdayEnd
    .split(':')
    .map(val => String(val).padStart(2, '0'))
    .join(':')
  const weekend_start = weekendStart
    .split(':')
    .map(val => String(val).padStart(2, '0'))
    .join(':')
  const weekend_end = weekendEnd
    .split(':')
    .map(val => String(val).padStart(2, '0'))
    .join(':')
  return {
    weekday_start,
    weekday_end,
    weekend_start,
    weekend_end,
  }
}

function OperationHour({formData, setFormData, isEditMode}: IProps) {
  const [time, setTime] = useState<ITime>(initialTime)
  const weekdays_start_ref = useRef<HTMLInputElement>(null)
  const weekdays_end_ref = useRef<HTMLInputElement>(null)
  const weekend_start_ref = useRef<HTMLInputElement>(null)
  const weekend_end_ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (JSON.stringify(time) !== JSON.stringify(initialTime)) return
    const parsedTime = parseTimeString(
      formData.placeOperationWeekDayStartDateTime,
      formData.placeOperationWeekDayEndDateTime,
      formData.placeOperationWeekEndStartDateTime,
      formData.placeOperationWeekEndEndDateTime,
    )
    setTime(parsedTime)
  }, [formData])

  const matchTimeName: IMatchTimeName = {
    weekday_start: 'placeOperationWeekDayStartDateTime',
    weekday_end: 'placeOperationWeekDayEndDateTime',
    weekend_start: 'placeOperationWeekEndStartDateTime',
    weekend_end: 'placeOperationWeekEndEndDateTime',
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(prev => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      }
    })

    setFormData(prev => {
      return {
        ...prev,
        [matchTimeName[e.target.id]]: e.target.value,
      }
    })
  }

  return (
    <S.Wrap>
      <S.HourItem>
        <S.Name>평일 : </S.Name>
        <TimeInput
          disabled={!isEditMode}
          id='weekday_start'
          ref={weekdays_start_ref}
          rightSection={
            <ActionIcon
              disabled={!isEditMode}
              onClick={() =>
                weekdays_start_ref && weekdays_start_ref.current && weekdays_start_ref.current.showPicker()
              }
            >
              <IconClock size='1rem' stroke={1.5} />
            </ActionIcon>
          }
          onChange={handleTimeChange}
          value={time?.weekday_start}
          required
        />
        <span> ~ </span>
        <TimeInput
          disabled={!isEditMode}
          id='weekday_end'
          ref={weekdays_end_ref}
          rightSection={
            <ActionIcon
              disabled={!isEditMode}
              onClick={() => weekdays_end_ref && weekdays_end_ref.current && weekdays_end_ref.current.showPicker()}
            >
              <IconClock size='1rem' stroke={1.5} />
            </ActionIcon>
          }
          onChange={handleTimeChange}
          value={time?.weekday_end}
          required
        />
      </S.HourItem>
      <S.HourItem>
        <S.Name>주말 : </S.Name>
        <TimeInput
          id='weekend_start'
          ref={weekend_start_ref}
          rightSection={
            <ActionIcon
              disabled={!isEditMode}
              onClick={() => weekend_start_ref && weekend_start_ref.current && weekend_start_ref.current.showPicker()}
            >
              <IconClock size='1rem' stroke={1.5} />
            </ActionIcon>
          }
          onChange={handleTimeChange}
          value={time?.weekend_start}
          required
          disabled={!isEditMode}
        />
        <span> ~ </span>
        <TimeInput
          id='weekend_end'
          ref={weekend_end_ref}
          rightSection={
            <ActionIcon
              disabled={!isEditMode}
              onClick={() => weekend_end_ref && weekend_end_ref.current && weekend_end_ref.current.showPicker()}
            >
              <IconClock size='1rem' stroke={1.5} />
            </ActionIcon>
          }
          onChange={handleTimeChange}
          value={time?.weekend_end}
          required
          disabled={!isEditMode}
        />
      </S.HourItem>
    </S.Wrap>
  )
}

export default OperationHour
