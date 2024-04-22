// EditModal.tsx
import React, {useEffect, useState} from 'react'
import {CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton, CFormSelect} from '@coreui/react'
import {updateBirth, updateEmail, updateGender, updateNickname, updatePhone} from '../../apis/userManagement'

interface EditModalProps {
  visible: boolean
  title: string
  fieldToEdit: string
  initialValue: string
  onClose: () => void
  userId: string | undefined
}

const Gender = {
  MALE: '남성',
  FEMALE: '여성',
  UNKNOWN: '선택 안함',
}
const EditModal: React.FC<EditModalProps> = ({visible, title, fieldToEdit, initialValue, onClose, userId}) => {
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue, fieldToEdit])

  const getInitialGenderValue = (genderLabel: string) => {
    return Object.keys(Gender).find(key => Gender[key as keyof typeof Gender] === genderLabel) || 'UNKNOWN'
  }

  const [value, setValue] = useState<string>(
    fieldToEdit === 'gender' ? getInitialGenderValue(initialValue) : initialValue,
  )

  useEffect(() => {
    setValue(fieldToEdit === 'gender' ? getInitialGenderValue(initialValue) : initialValue)
  }, [initialValue, fieldToEdit])

  const handleSaveClick = async () => {
    console.log('저장 ' + value)
    if (!userId) return // userId 가 없다면 함수를 종료합니다.
    const id = Number(userId)
    try {
      let response: any
      switch (fieldToEdit) {
        case 'birth':
          response = await updateBirth(id, value)
          break
        case 'email':
          response = await updateEmail(id, value)
          break
        case 'phoneNumber':
          response = await updatePhone(id, value)
          break
        case 'gender':
          response = await updateGender(id, value)
          break
        case 'nickname':
          response = await updateNickname(id, value)
          break
        default:
          throw new Error('Invalid field to edit')
      }
      alert('성공적으로 업데이트 되었습니다.')
    } catch (error) {
      alert(error.response.data.message)
    } finally {
      window.location.reload()
    }
  }

  const renderInputField = () => {
    switch (fieldToEdit) {
      case 'birth':
        return <input type='date' value={value} onChange={e => setValue(e.target.value)} />
      case 'gender':
        return (
          <CFormSelect value={value} onChange={e => setValue(e.target.value)}>
            {Object.entries(Gender).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </CFormSelect>
        )
      default:
        return <input type='text' value={value} onChange={e => setValue(e.target.value)} />
    }
  }

  return (
    <CModal visible={visible} onClose={onClose} size='lg'>
      <CModalHeader closeButton>
        <CModalTitle>{title}</CModalTitle>
      </CModalHeader>
      <CModalBody>{renderInputField()}</CModalBody>
      <CModalFooter>
        <CButton color='secondary' onClick={onClose}>
          취소
        </CButton>
        <CButton color='dark' onClick={handleSaveClick}>
          저장
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default EditModal
