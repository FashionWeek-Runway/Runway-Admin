import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {CModal} from '@coreui/react'
import * as S from './SingleImageModal.styled'

interface IProps {
  imageFile: File | undefined
  setImageFile: Dispatch<SetStateAction<File | undefined>>
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

function SingleImageModal({isModalOpen, setIsModalOpen, imageFile, setImageFile}: IProps) {
  const [selectedImageFile, setSelectedImageFile] = useState<File>()

  useEffect(() => {
    if (imageFile) {
      setSelectedImageFile(imageFile)
    }
  }, [imageFile])

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleApply = () => {
    setImageFile(selectedImageFile)
    closeModal()
  }

  const handleCancel = () => {
    setImageFile(imageFile)
    setSelectedImageFile(imageFile)
    closeModal()
  }

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nowSelectImage = e.target.files

    if (!nowSelectImage) return
    // const nowImageUrl = URL.createObjectURL(nowSelectImage[0])
    setSelectedImageFile(nowSelectImage[0])
  }

  return (
    <CModal visible={isModalOpen} onClose={closeModal}>
      <S.ContentWrap>
        <h2>Image</h2>
        <S.ImageWrap>
          {selectedImageFile && <img src={URL.createObjectURL(selectedImageFile)} alt='exhibition' />}
        </S.ImageWrap>
        <S.Footer>
          <label htmlFor='bannerImage'>
            이미지 변경하기
            <input onChange={addImage} type='file' id='bannerImage' name='filename' accept='.jpg,.jpeg,.png,.svg' />
          </label>
          <div>
            <button onClick={handleApply} disabled={!selectedImageFile}>
              적용
            </button>
            <button onClick={handleCancel}>취소</button>
          </div>
        </S.Footer>
      </S.ContentWrap>
    </CModal>
  )
}

export default SingleImageModal
