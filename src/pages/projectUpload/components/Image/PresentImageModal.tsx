import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import CIcon from '@coreui/icons-react'
import {cilX} from '@coreui/icons'
import * as S from './ImageModal.styled'

interface IProps {
  imageFile: File | null
  setImageFile: Dispatch<SetStateAction<File | null>>
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

function ImageModal({isModalOpen, setIsModalOpen, imageFile, setImageFile}: IProps) {
  useEffect(() => {
    // Ensure that the selected image file is updated when the prop changes
    setSelectedImageFile(imageFile)
  }, [imageFile])

  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(imageFile)

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0]

    if (!selectedFile) return

    // Check the file size (5MB limit)
    const MAX_FILE_SIZE = 5000000 // 5MB
    if (selectedFile.size > MAX_FILE_SIZE) {
      // Handle oversized file (e.g., show a message)
      console.log('Selected image is too large.')
      return
    }

    // Update the selected image file state
    setSelectedImageFile(selectedFile)
  }

  const handleApply = () => {
    // Set the selected image file as the new image file
    setImageFile(selectedImageFile)
    closeModal()
  }

  const handleCancel = () => {
    // Reset the selected image file to the original image file
    setSelectedImageFile(imageFile)
    closeModal()
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <S.Modal visible={isModalOpen} onClose={closeModal}>
      <h2>Image</h2>
      {selectedImageFile ? (
        <S.ImageWrap>
          <S.ImageItem>
            <img src={URL.createObjectURL(selectedImageFile)} alt='space' />
            <button onClick={() => setSelectedImageFile(null)}>
              <CIcon icon={cilX} size='sm' />
            </button>
          </S.ImageItem>
        </S.ImageWrap>
      ) : (
        <p>No image selected</p>
      )}
      <S.Controllers>
        <S.Button as='label' htmlFor='myFile' isLabel>
          Select an Image
          <input onChange={addImage} type='file' id='myFile' name='filename' accept='.jpg,.jpeg,.png,.svg' />
        </S.Button>
        <S.ButtonsWrap>
          <S.Button onClick={handleApply} disabled={!selectedImageFile}>
            Apply
          </S.Button>
          <S.Button onClick={handleCancel}>Cancel</S.Button>
        </S.ButtonsWrap>
      </S.Controllers>
    </S.Modal>
  )
}

export default ImageModal
