import React, {Dispatch, SetStateAction, useRef, useState} from 'react'
import {CModal} from '@coreui/react'
import * as S from './Map.styled'
import DaumPostcodeEmbed, {Address} from 'react-daum-postcode'
import {ISpaceItem} from '../../../../models/Space'

interface IProps {
  formData: ISpaceItem
  setFormData: Dispatch<SetStateAction<ISpaceItem>>
  isEditMode: boolean
}

function Map({formData, setFormData, isEditMode}: IProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleComplete = (data: Address) => {
    if (inputRef && inputRef.current) {
      inputRef.current.value = data.address
    }

    setFormData(prev => {
      return {
        ...prev,
        placeLocation: data.address,
      }
    })

    setIsModalOpen(false)
  }

  const handleClick = () => {
    if (!isEditMode) return
    setIsModalOpen(true)
  }

  return (
    <S.Wrap>
      <input ref={inputRef} value={formData.placeLocation} type='text' onClick={handleClick} disabled={!isEditMode} />
      <CModal visible={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <S.ContentWrap>
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </S.ContentWrap>
      </CModal>
    </S.Wrap>
  )
}

export default Map
