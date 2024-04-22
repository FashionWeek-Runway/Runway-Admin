// EventPreview.tsx
import React from 'react'
import * as S from './Event.styled' // Import your styled-components

interface EventPreviewProps {
  thumbnail: string
  title: string
  smallTitle: string
  startDate: string
  endDate: string
}

const EventPreview: React.FC<EventPreviewProps> = ({thumbnail, title, smallTitle, startDate, endDate}) => {
  return (
    <S.EventPreviewContainer>
      <S.EventPreviewImage src={thumbnail} alt='Notice Thumbnail' />
      <S.EventPreviewDetails>
        <S.EventPreviewTitle>{title}</S.EventPreviewTitle>
        <S.EventPreviewSmallTitle>{smallTitle}</S.EventPreviewSmallTitle>
        <S.EventPreviewDate>
          {startDate} ~ {endDate}
        </S.EventPreviewDate>
      </S.EventPreviewDetails>
    </S.EventPreviewContainer>
  )
}

export default EventPreview
