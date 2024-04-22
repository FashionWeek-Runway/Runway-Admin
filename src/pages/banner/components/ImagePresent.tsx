import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {CButton, CCarousel, CCarouselItem} from '@coreui/react'
import * as S from '../../projectUpload/components/Image/ImageCarousel.styled'
import PresentImageModal from './ImageModal'
import ImageModal from './ImageModal'

interface IProps {
  presentFile: File | string | null
  setPresentFile: Dispatch<SetStateAction<File | string | null>>
  title: string
  isEditMode: boolean
}

function ImagePresent({presentFile, setPresentFile, title, isEditMode}: IProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => {
    setIsModalOpen(true)
  }
  useEffect(() => {
    setIsModalOpen(false)
  }, [presentFile])

  useEffect(() => {
    setPresentFile(presentFile)
    setTimeout(() => {
      console.log('PresentFile Edit Mode:', presentFile)
    }, 0)
  }, [setPresentFile, presentFile])
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPresentFile(e.target.files[0])
      setIsModalOpen(true)
    }
  }

  return (
    <S.CarouselWrap>
      {presentFile && typeof presentFile === 'string' ? (
        <img src={presentFile} alt={`slide`} />
      ) : presentFile && typeof presentFile === 'object' ? (
        <CCarousel indicators>
          <CCarouselItem>
            <img src={URL.createObjectURL(presentFile)} alt={`banner`} />
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
        {presentFile && (typeof presentFile === 'object' || typeof presentFile === 'string') ? (
          <CButton onClick={openModal}>이미지 편집</CButton>
        ) : (
          <label>
            이미지 추가
            <input
              type='file'
              accept='.jpg, .jpeg, .png, .svg'
              onChange={handleImageChange}
              style={{display: 'none'}}
            />
          </label>
        )}
      </S.ButtonWrap>
      <ImageModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        presentFile={presentFile}
        setPresentFile={setPresentFile}
        isEditMode={isEditMode}
      />
    </S.CarouselWrap>
  )
}

export default ImagePresent
