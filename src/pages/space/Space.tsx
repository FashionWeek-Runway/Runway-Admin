import React, {useEffect, useRef, useState} from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {CButton, CContainer, CFormInput, CFormSelect} from '@coreui/react'
import {getSpaceList} from '../../apis/space'
import {ISpaceListItem, TSpaceSearchFilter} from '../../models/Space'
import {CSmartTable} from '../../components/custom/smart-table/CSmartTable'
import {CSmartPagination} from '../../components/custom/pagination/CSmartPagination'
import * as S from './Space.styled'

export const ITEMS_PER_PAGE = 20

export const space_columns = [
  {
    label: '번호',
    key: 'placeIdx',
    _style: {width: '5%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '이름',
    key: 'placeName',
    _style: {width: '10%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '설명 URL',
    key: 'placeUrl',
    _style: {width: '75%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '노출여부',
    key: 'display',
    _style: {width: '10%'},
    _props: {className: 'fw-semibold'},
  },
]

const optionList = [
  {id: 1, label: '공간', value: 'name'},
  {id: 2, label: '지역', value: 'location'},
  {id: 3, label: '키워드', value: 'keyword'},
]

export interface IParams {
  size: number
  page: number
  filter: TSpaceSearchFilter
  searchKey: string
}

function Space() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const [spaceList, setSpaceList] = useState<ISpaceListItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const searchCategoryRef = useRef<HTMLSelectElement>(null)
  const searchKeyRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    searchParams.set('page', String(currentPage))
    setSearchParams(searchParams)
    setCurrentPage(parseInt(searchParams.get('page') as string))
  }, [])

  useEffect(() => {
    const searchKey = searchParams.get('searchKey') ? searchParams.get('searchKey') : ''
    const filter = (searchParams.get('filter') ? searchParams.get('filter') : 'name') as TSpaceSearchFilter

    const fetchData = async () => {
      const {totalPageCnt, getPlaceListRes} = await getSpaceList(ITEMS_PER_PAGE, currentPage, searchKey, filter)
      setSpaceList(getPlaceListRes)
      setTotalPages(totalPageCnt)
    }

    fetchData()
  }, [searchParams, currentPage])

  const changeCurrentPage = (page: number) => {
    if (page === currentPage) return
    setCurrentPage(page)
    searchParams.set('page', String(page))
    searchParams.set('size', String(ITEMS_PER_PAGE))
    setSearchParams(searchParams)
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const currentSearchFilter = searchCategoryRef?.current && (searchCategoryRef.current.value as TSpaceSearchFilter)
    const currentSearchKey = searchKeyRef?.current && searchKeyRef.current.value

    setCurrentPage(1)
    searchParams.set('searchKey', currentSearchKey ? currentSearchKey : '')
    searchParams.set('filter', currentSearchFilter ? currentSearchFilter : 'name')
    searchParams.set('page', '1')
    searchParams.set('size', String(ITEMS_PER_PAGE))
    setSearchParams(searchParams)
  }

  return (
    <S.Wrap>
      <S.Header>
        <S.SearchBox onSubmit={handleSearch}>
          <CFormSelect
            aria-label='검색 카테고리 선택'
            ref={searchCategoryRef}
            defaultValue={searchParams.get('filter') as TSpaceSearchFilter}
          >
            {optionList.map(option => (
              <option key={option.id} value={option.value}>
                {option.label}
              </option>
            ))}
          </CFormSelect>
          <CFormInput
            type='text'
            id='searchKey'
            placeholder='검색어를 입력하세요'
            aria-describedby='searchKey'
            ref={searchKeyRef}
          />
          <CButton type='submit'>검색</CButton>
        </S.SearchBox>
        <CButton component='a' href='/space/new'>
          공간 추가하기
        </CButton>
      </S.Header>
      <CContainer>
        <CSmartTable
          columns={space_columns}
          itemsPerPage={ITEMS_PER_PAGE}
          items={spaceList}
          clickableRows={true}
          onRowClick={item => navigate(`${item.placeIdx}`)}
          tableHeadProps={{color: 'primary'}}
          tableProps={{
            hover: true,
            responsive: true,
            bgcolor: 'white',
          }}
          scopedColumns={{
            display: (item: ISpaceListItem) => {
              return <td>{item.display ? '노출' : '숨김'}</td>
            },
          }}
        />
        <CSmartPagination
          align='center'
          pages={totalPages}
          onActivePageChange={page => {
            changeCurrentPage(page)
          }}
          activePage={currentPage}
        />
      </CContainer>
    </S.Wrap>
  )
}

export default Space
