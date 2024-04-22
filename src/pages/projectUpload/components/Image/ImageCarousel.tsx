import React, {Dispatch, SetStateAction, useState} from 'react'
import {CButton, CCarousel, CCarouselItem} from '@coreui/react'
import ImageModal from './ImageModal'
import * as S from './ImageCarousel.styled'

interface IProps {
  imageFiles: File[]
  setImageFiles: Dispatch<SetStateAction<File[]>>
}

function ImageCarousel({imageFiles, setImageFiles}: IProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)

  return (
    <S.CarouselWrap>
      {imageFiles.length ? (
        <CCarousel indicators>
          {imageFiles.map((image, idx) => (
            <CCarouselItem key={idx}>
              <img src={URL.createObjectURL(image)} alt={`slide ${idx + 1}`} />
            </CCarouselItem>
          ))}
        </CCarousel>
      ) : (
        <S.ImagePlaceholder>
          <h2>사진 첨부하기</h2>
          <ul>
            <li>최대 10장</li>
            <li>jpeg / jpg / png / svg 가능</li>
            <li>각 이미지당 최대 5mb</li>
          </ul>
        </S.ImagePlaceholder>
      )}
      <S.ButtonWrap>
        <CButton onClick={openModal}>이미지 업로드</CButton>
      </S.ButtonWrap>
      <ImageModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        imageFiles={imageFiles}
        setImageFiles={setImageFiles}
      />
    </S.CarouselWrap>
  )
}

export default ImageCarousel
