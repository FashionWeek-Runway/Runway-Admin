// Banner.tsx
import React, {useEffect, useState} from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {CButton, CCol, CContainer, CImage, CModal, CModalBody} from '@coreui/react'
import {CSmartTable} from '../../components/custom/smart-table/CSmartTable'
import * as S from './Event.styled'
import {IParams} from '../projectManagement/projectDetail'
import {CSmartPagination} from '../../components/custom/pagination/CSmartPagination'
import EventModal from './EventModal'
import {IEventContent, IEventItem, IEventListResponse} from '../../models/Event'
import {deleteEvent, getEventList} from '../../apis/event'

export const ITEMS_PER_PAGE = 10

const columns = [
  {
    label: '이벤트 ID',
    key: 'eventId',
    _style: {width: '5%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '대표이미지',
    key: 'thumbnail',
    _style: {width: '30%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '이벤트 명',
    key: 'title',
    _style: {width: '30%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '이벤트 소제목',
    key: 'smallTitle',
    _style: {width: '5%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '이벤트 기간',
    key: 'date',
    _style: {width: '35%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '설정',
    key: 'setting',
    _style: {width: '30%'},
    _props: {className: 'fw-semibold'},
  },
]

function Event() {
  const navigate = useNavigate()
  const [eventList, setEventList] = useState<IEventItem[]>()
  const [searchParams, setSearchParams] = useSearchParams()
  const [filter, setFilter] = useState<IParams>({page: 1, size: ITEMS_PER_PAGE})
  const [pageNum, setPageNum] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [showImageModal, setImageModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')
  const [selectedEventId, setSelectedEventBannerId] = useState<number>(0)
  const [isEditMode, setIsEditMode] = useState(false)
  const [eventInfo, setEventInfo] = useState<IEventItem>({
    eventId: 0,
    thumbnail: '',
    title: '',
    eventType: '',
    smallTitle: '',
    endDate: '',
    startDate: '',
  })
  const handleShowModal = () => {
    setIsEditMode(false)
    setShowModal(true)
    setSelectedEventBannerId(0)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl)
    setImageModal(true)
  }

  const handleEdit = (item: IEventItem) => {
    setIsEditMode(true)
    setShowModal(true)
    setEventInfo(item)
    setSelectedEventBannerId(item.eventId)
  }

  useEffect(() => {
    const fetchData = async () => {
      const size = Number(searchParams.get('size'))
      const currentFilter = {
        page: Number(searchParams.get('page')) < 1 ? 1 : Number(searchParams.get('page')),
        size: calibratedPageSize(size),
      }
      setFilter(currentFilter)
      getEventListApi(currentFilter)
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (selectedEventId !== undefined && selectedEventId !== 0) {
    }
  }, [selectedEventId])

  const getEventListApi = async ({page, size}: IParams) => {
    try {
      const response = await getEventList<IEventListResponse>(size, page - 1)
      setEventList(response.contents)
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  const deleteEventApi = async (eventId: number | undefined) => {
    try {
      if (eventId === undefined) {
        alert('삭제할 이벤트가 없습니다.')
        return // Stop function execution
      }
      const response: any = await deleteEvent(eventId)
      alert('이벤트가 삭제 되었습니다.')
      window.location.reload()
    } catch (error) {
      // Check if there is an error response
      if (error.response && error.response.data) {
        alert(error.response.data.message)
      } else {
        alert('알 수 없는 오류가 발생했습니다.')
      }
    }
  }

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation()
  }

  const calibratedPageSize = (size: number) => {
    if (size < 10) return 10
    else if (size > 1000) return 1000
    return size
  }

  return (
    <S.Wrap>
      <CContainer>
        <CCol>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
            <h3>이벤트 리스트</h3>
            <CButton component='a' color={'dark'} onClick={handleShowModal}>
              이벤트 추가하기
            </CButton>
          </div>
          <CSmartTable
            columns={columns}
            itemsPerPage={ITEMS_PER_PAGE}
            items={eventList}
            clickableRows={true}
            tableHeadProps={{color: 'dark'}}
            tableProps={{
              hover: true,
              responsive: true,
              bgcolor: 'white',
            }}
            scopedColumns={{
              thumbnail: (item: IEventItem) => {
                return (
                  <td onClick={() => handleImageClick(item.thumbnail)}>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                      <img src={item.thumbnail} style={{maxWidth: '100%', height: 'auto'}} />
                    </div>
                  </td>
                )
              },
              setting: (item: IEventItem) => {
                const handleDelete = () => {
                  deleteEventApi(item.eventId)
                }

                return (
                  <td style={{textAlign: 'center'}}>
                    <CButton color='dark' size='sm' onClick={() => handleEdit(item)}>
                      수정
                    </CButton>{' '}
                    <CButton color='dark' size='sm' onClick={handleDelete}>
                      삭제
                    </CButton>
                  </td>
                )
              },
              date: (item: IEventItem) => {
                const startDate = item.startDate
                const endDate = item.endDate
                return (
                  <td>
                    {startDate} ~ {endDate}
                  </td>
                )
              },
            }}
          />
          <CModal visible={showImageModal} onClose={() => setImageModal(false)} size='lg'>
            <CModalBody>
              <CImage src={selectedImage} style={{width: '100%'}} />
            </CModalBody>
          </CModal>
          <CSmartPagination
            align='center'
            size='sm'
            limit={11}
            pages={pageNum}
            onActivePageChange={page => {
              searchParams.set('page', String(page))
              setSearchParams(searchParams)
            }}
            activePage={filter.page}
          ></CSmartPagination>
        </CCol>
      </CContainer>
      {showModal && (
        <EventModal
          showModal={showModal}
          onClose={handleCloseModal}
          title={'이벤트 추가'}
          eventId={selectedEventId}
          isEditMode={isEditMode}
          item={eventInfo}
        />
      )}
    </S.Wrap>
  )
}

export default Event
