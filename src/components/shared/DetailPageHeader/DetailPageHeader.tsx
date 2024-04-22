import React, {Dispatch, SetStateAction} from 'react'
import {NavigateFunction} from 'react-router-dom'
import {CButton} from '@coreui/react'
import * as S from './DetailPageHeader.styled'

interface IProps {
  isNew: boolean | undefined
  navigate: NavigateFunction
  isEditMode: boolean
  setIsEditMode: Dispatch<SetStateAction<boolean>>
  checkIsDisabled: () => boolean
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>
}

function DetailPageHeader({isNew, navigate, isEditMode, setIsEditMode, checkIsDisabled, setIsDeleteModalOpen}: IProps) {
  return (
    <S.Header>
      <CButton onClick={() => navigate(-1)}>뒤로가기</CButton>
      <S.Buttons>
        {!isNew && (
          <>
            {!isEditMode ? (
              <CButton type='submit' onClick={() => setIsEditMode(true)}>
                수정하기
              </CButton>
            ) : (
              <CButton type='button' disabled={checkIsDisabled()} onClick={() => setIsEditMode(false)}>
                수정완료
              </CButton>
            )}
            <CButton type='button' onClick={() => setIsDeleteModalOpen(true)}>
              삭제
            </CButton>
          </>
        )}
        {isNew && (
          <CButton type='submit' disabled={checkIsDisabled()}>
            추가하기
          </CButton>
        )}
      </S.Buttons>
    </S.Header>
  )
}

export default DetailPageHeader
