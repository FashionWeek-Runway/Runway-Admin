import React, {Dispatch, SetStateAction, useState} from 'react'
import {CButton} from '@coreui/react'
import KeywordModal from './KeywordModal'
import {ISpaceItem} from '../../../../models/Space'
import * as S from './Keyword.styled'

interface IProps {
  formData: ISpaceItem
  setFormData: Dispatch<SetStateAction<ISpaceItem>>
  isEditMode: boolean
}

function Keyword({formData, setFormData, isEditMode}: IProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleClick = () => {
    setIsModalOpen(true)
  }

  return (
    <S.Wrap>
      <S.KeywordBox>
        {formData.placeKeywordList.map(keyword => (
          <S.KeywordItem key={keyword.keywordIdx}>{keyword.keyword}</S.KeywordItem>
        ))}
      </S.KeywordBox>
      <S.ButtonWrap>
        <CButton disabled={!isEditMode} onClick={handleClick}>
          Edit Keyword
        </CButton>
      </S.ButtonWrap>
      <KeywordModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        formData={formData}
        setFormData={setFormData}
      />
    </S.Wrap>
  )
}

export default Keyword
