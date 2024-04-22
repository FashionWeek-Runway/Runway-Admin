import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import CIcon from '@coreui/icons-react'
import {cilX} from '@coreui/icons'
import * as S from './ImageModal.styled'

interface IProps {
  presentFile: File | string | null
  setPresentFile: Dispatch<SetStateAction<File | string | null>>
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  isEditMode: boolean
}

function ImageModal({isModalOpen, setIsModalOpen, presentFile, setPresentFile, isEditMode}: IProps) {
  const [selectedImageFile, setSelectedImageFile] = useState<File | string | null>(presentFile)
  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0]
    if (!selectedFile) {
      alert('선택된 파일이 없습니다.')
      return
    }
    const MAX_FILE_SIZE = 5000000 // 5MB
    if (selectedFile.size > MAX_FILE_SIZE) {
      alert('선택한 이미지가 너무 큽니다.')
      return
    }
    setSelectedImageFile(selectedFile)
  }

  const handleApply = () => {
    console.log('선택한 이미지 파일을 새 이미지 파일로 설정합니다.')
    if (selectedImageFile instanceof File) {
      console.log('변경')
      setPresentFile(selectedImageFile)
    } else if (typeof selectedImageFile === 'string') {
      console.log('URL 변경')
      setPresentFile(selectedImageFile)
    } else {
      setPresentFile(null)
    }
    // 이미지 모달이 완전히 종료된 후에 setPresentFile이 실행되도록 setTimeout 사용
    setIsModalOpen(false)
  }

  useEffect(() => {
    setPresentFile(presentFile) // 이 부분 추가
    setTimeout(() => {
      console.log('PresentFile Edit Mode:', presentFile)
    }, 0)
  }, [setPresentFile, presentFile])
  const handleCancel = () => {
    setSelectedImageFile(presentFile)
    closeModal()
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <S.Modal visible={isModalOpen} onClose={closeModal}>
      <h2>이미지</h2>
      {selectedImageFile ? (
        <S.ImageWrap>
          <S.ImageItem>
            {typeof selectedImageFile === 'string' ? (
              <img src={selectedImageFile} alt='banner' />
            ) : (
              <>
                <img src={URL.createObjectURL(selectedImageFile)} alt='banner' />
              </>
            )}
          </S.ImageItem>
        </S.ImageWrap>
      ) : (
        <p>선택된 이미지가 없습니다.</p>
      )}
      <S.Controllers>
        <S.Button as='label' htmlFor='myFile' isLabel>
          이미지 선택
          <input onChange={addImage} type='file' id='myFile' name='filename' accept='.jpg,.jpeg,.png,.svg' />
        </S.Button>
        <S.ButtonsWrap>
          <S.Button onClick={handleApply} disabled={!selectedImageFile}>
            적용
          </S.Button>
          <S.Button onClick={handleCancel}>취소</S.Button>
        </S.ButtonsWrap>
      </S.Controllers>
    </S.Modal>
  )
}

export default ImageModal
