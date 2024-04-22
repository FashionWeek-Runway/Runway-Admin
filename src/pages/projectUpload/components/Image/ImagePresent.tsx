import React, {Dispatch, SetStateAction, useState} from 'react'
import {CButton, CCarousel, CCarouselItem} from '@coreui/react'
import ImageModal from './ImageModal'
import * as S from './ImageCarousel.styled'
import PresentImageModal from './PresentImageModal'

interface IProps {
  presentFile: File | null
  setPresentFile: Dispatch<SetStateAction<File | null>>
  title: string
}

function ImagePresent({presentFile, setPresentFile, title}: IProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditImg, setIsEditImg] = useState(false)
  const openModal = () => setIsModalOpen(true)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Update the imageFile state with the selected image file (replace the previous one)
      setPresentFile(e.target.files[0])
      setIsEditImg(true)
    }
  }

  return (
    <S.CarouselWrap>
      {presentFile ? (
        <CCarousel indicators>
          <CCarouselItem>
            <img src={URL.createObjectURL(presentFile)} alt={`slide`} />
          </CCarouselItem>
        </CCarousel>
      ) : (
        <S.ImagePlaceholder>
          <h2>{title}</h2>
          <ul>
            <li>1장</li>
            <li>jpeg / jpg / png / svg 가능</li>
            <li>각 이미지당 최대 5mb</li>
          </ul>
        </S.ImagePlaceholder>
      )}
      <S.ButtonWrap>
        {isEditImg ? (
          <CButton onClick={openModal}>이미지 편집</CButton>
        ) : (
          <CButton onClick={openModal}>이미지 추가</CButton>
        )}
      </S.ButtonWrap>
      <PresentImageModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        imageFile={presentFile}
        setImageFile={setPresentFile}
      />
    </S.CarouselWrap>
  )
}

export default ImagePresent
