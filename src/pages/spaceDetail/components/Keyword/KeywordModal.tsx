import React, {useRef, useState, Dispatch, SetStateAction, useEffect} from 'react'
import {cilX} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {CModal} from '@coreui/react'
import {IKeywordItem, ISpaceItem} from '../../../../models/Space'
import {getSpaceKeywordList} from '../../../../apis/space'
import * as S from './Keyword.styled'

interface IProps {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  formData: ISpaceItem
  setFormData: Dispatch<SetStateAction<ISpaceItem>>
}

function KeywordModal({isModalOpen, setIsModalOpen, formData, setFormData}: IProps) {
  const [keywordData, setKeywordData] = useState<IKeywordItem[]>([])
  const [keywordList, setKeywordList] = useState<IKeywordItem[]>([])
  const [selectedKeywords, setSelectedKeywords] = useState<IKeywordItem[]>([])
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSpaceKeywordList()
      setKeywordList(data)
      setKeywordData(data)
    }
    setSelectedKeywords(formData.placeKeywordList)
    fetchData()
  }, [formData])

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchRef && searchRef.current) {
      const searchWord = searchRef.current.value
      const updatedKeywordList = keywordData.filter(keyword => keyword.keyword.includes(searchWord))
      setKeywordList(updatedKeywordList)
    }
  }

  const addKeyword = (targetKeyword: string) => {
    const idx = selectedKeywords.findIndex(keyword => keyword.keyword === targetKeyword)
    if (idx !== -1) return

    const newKeyword = keywordList.find(keyword => keyword.keyword === targetKeyword)

    newKeyword &&
      setSelectedKeywords(prev => {
        return [...prev, newKeyword]
      })
  }

  const updateKeyword = () => {
    setFormData(prev => {
      return {
        ...prev,
        placeKeywordList: selectedKeywords,
      }
    })

    closeModal()
  }

  const deleteKeyword = (targetKeyword: string) => {
    const upatedKeywordList = selectedKeywords.filter(keyword => keyword.keyword !== targetKeyword)
    setSelectedKeywords(upatedKeywordList)
  }

  const handleCancel = () => {
    setSelectedKeywords(formData.placeKeywordList)
    closeModal()
  }

  return (
    <CModal visible={isModalOpen} onClose={closeModal}>
      <S.ModalContent>
        <S.SelectedKeywordList>
          {selectedKeywords.map(keyword => (
            <S.SelectedKeywordItem key={keyword.keywordIdx}>
              <span>{keyword.keyword}</span>
              <button onClick={() => deleteKeyword(keyword.keyword)}>
                <CIcon icon={cilX} size='sm' />
              </button>
            </S.SelectedKeywordItem>
          ))}
        </S.SelectedKeywordList>
        <S.Searchbar onSubmit={handleSearch}>
          <input type='text' placeholder='키워드를 검색해보세요' ref={searchRef} />
          <button type='submit'>검색</button>
        </S.Searchbar>
        <S.KeywordList>
          {keywordList.map(keyword => (
            <S.KeywordItem
              key={keyword.keywordIdx}
              className={
                selectedKeywords.filter(current => current.keyword === keyword.keyword).length ? 'isSelected' : ''
              }
              onClick={() => addKeyword(keyword.keyword)}
            >
              {keyword.keyword}
            </S.KeywordItem>
          ))}
        </S.KeywordList>
        <S.ButtonList>
          <button onClick={updateKeyword} disabled={selectedKeywords.length < 3}>
            적용
          </button>
          <button onClick={handleCancel}>취소</button>
        </S.ButtonList>
      </S.ModalContent>
    </CModal>
  )
}

export default KeywordModal
