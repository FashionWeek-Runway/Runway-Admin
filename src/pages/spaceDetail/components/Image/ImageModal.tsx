import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import CIcon from '@coreui/icons-react'
import {cilX} from '@coreui/icons'
import * as S from './ImageModal.styled'

interface IProps {
  imageFiles: File[]
  setImageFiles: Dispatch<SetStateAction<File[]>>
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

function ImageModal({isModalOpen, setIsModalOpen, imageFiles, setImageFiles}: IProps) {
  const [selectedImageFiles, setSelectedImageFiles] = useState<File[]>([])

  useEffect(() => {
    setSelectedImageFiles(imageFiles)
  }, [imageFiles])

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nowSelectImageList = e.target.files

    if (!nowSelectImageList || selectedImageFiles.length + nowSelectImageList.length > 10) return
    for (let i = 0; i < nowSelectImageList.length; i += 1) {
      const MAX_FILE_SIZE = 5000000 // 5MB
      if (nowSelectImageList[i].size > MAX_FILE_SIZE) {
        continue
      }

      setSelectedImageFiles(prev => {
        return [...prev, nowSelectImageList[i]]
      })
    }
  }

  const deleteImage = (targetImageIdx: number) => {
    const filteredImageList = selectedImageFiles.filter((_imageFile, idx) => idx !== targetImageIdx)
    setSelectedImageFiles(filteredImageList)
  }

  const handleApply = () => {
    setImageFiles(selectedImageFiles)
    setSelectedImageFiles(selectedImageFiles)
    closeModal()
  }

  const handleCancel = () => {
    setImageFiles(imageFiles)
    setSelectedImageFiles(imageFiles)
    closeModal()
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <S.Modal visible={isModalOpen} onClose={closeModal}>
      <h2>Images</h2>
      <S.ImageWrap>
        {selectedImageFiles.map((imageFile, idx) => (
          <S.ImageItem key={idx}>
            <img src={URL.createObjectURL(imageFile)} alt='space' />
            <button onClick={() => deleteImage(idx)}>
              <CIcon icon={cilX} size='sm' />
            </button>
          </S.ImageItem>
        ))}
      </S.ImageWrap>
      <S.Controllers>
        <S.Button as='label' htmlFor='myFile' isLabel>
          이미지 추가하기
          <input onChange={addImage} type='file' id='myFile' name='filename' multiple accept='.jpg,.jpeg,.png,.svg' />
        </S.Button>
        <S.ButtonsWrap>
          <S.Button onClick={handleApply} disabled={selectedImageFiles.length < 1}>
            적용
          </S.Button>
          <S.Button onClick={handleCancel}>취소</S.Button>
        </S.ButtonsWrap>
      </S.Controllers>
    </S.Modal>
  )
}

export default ImageModal
