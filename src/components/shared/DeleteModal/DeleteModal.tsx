import React, {Dispatch, SetStateAction} from 'react'
import {CModal} from '@coreui/react'
import * as S from './DeleteModal.styled'

interface IProps {
  isDeleteModalOpen: boolean
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>
  handleDelete: () => void
}

function DeleteModal({isDeleteModalOpen, setIsDeleteModalOpen, handleDelete}: IProps) {
  const closeModal = () => {
    setIsDeleteModalOpen(false)
  }

  return (
    <CModal alignment='center' visible={isDeleteModalOpen} onClose={closeModal}>
      <S.ContentWrap>
        <h2>정말로 삭제하시겠습니까?</h2>
        <S.Buttons>
          <button type='button' onClick={closeModal}>
            취소
          </button>
          <button type='button' onClick={handleDelete}>
            삭제
          </button>
        </S.Buttons>
      </S.ContentWrap>
    </CModal>
  )
}

export default DeleteModal
