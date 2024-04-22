// Banner.tsx
import React, {useEffect, useState} from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {CButton, CCol, CContainer, CImage, CModal, CModalBody} from '@coreui/react'
import {CSmartTable} from '../../components/custom/smart-table/CSmartTable'
import * as S from './Notice.styled'
import {IParams} from '../projectManagement/projectDetail'
import {CSmartPagination} from '../../components/custom/pagination/CSmartPagination'
import NoticeModal from './NoticeModal'
import {IEventContent, IEventItem, IEventListResponse} from '../../models/Event'
import {deleteEvent, getEventList} from '../../apis/event'
import {INoticeItem, INoticeListResponse} from '../../models/Notice'
import {deleteNotice, getNoticeList} from '../../apis/notice'

export const ITEMS_PER_PAGE = 10

const columns = [
  {
    label: '공지사항 ID',
    key: 'noticeId',
    _style: {width: '5%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '공지사항 소분류',
    key: 'noticeType',
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
    label: '작성 일자',
    key: 'noticeDate',
    _style: {width: '5%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '설정',
    key: 'setting',
    _style: {width: '30%'},
    _props: {className: 'fw-semibold'},
  },
]

function Notice() {
  const navigate = useNavigate()
  const [noticeList, setNoticeList] = useState<INoticeItem[]>()
  const [searchParams, setSearchParams] = useSearchParams()
  const [filter, setFilter] = useState<IParams>({page: 1, size: ITEMS_PER_PAGE})
  const [pageNum, setPageNum] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [showImageModal, setImageModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')
  const [selectedEventId, setSelectedEventBannerId] = useState<number>(0)
  const [isEditMode, setIsEditMode] = useState(false)
  const [noticeInfo, setNoticeInfo] = useState<INoticeItem>({
    title: '',
    noticeId: 0,
    noticeDate: '',
    noticeType: '',
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

  const handleEdit = (item: INoticeItem) => {
    setIsEditMode(true)
    setShowModal(true)
    setNoticeInfo(item)
    setSelectedEventBannerId(item.noticeId)
  }

  useEffect(() => {
    const fetchData = async () => {
      const size = Number(searchParams.get('size'))
      const currentFilter = {
        page: Number(searchParams.get('page')) < 1 ? 1 : Number(searchParams.get('page')),
        size: calibratedPageSize(size),
      }
      setFilter(currentFilter)
      getNoticeListApi(currentFilter)
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (selectedEventId !== undefined && selectedEventId !== 0) {
    }
  }, [selectedEventId])

  const getNoticeListApi = async ({page, size}: IParams) => {
    try {
      const response = await getNoticeList<INoticeListResponse>(size, page - 1)
      setNoticeList(response.contents)
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  const deleteNoticeApi = async (noticeId: number | undefined) => {
    try {
      if (noticeId === undefined) {
        alert('삭제할 공지사항이 없습니다.')
        return // Stop function execution
      }
      const response: any = await deleteNotice(noticeId)
      alert('공지사항이 삭제 되었습니다.')
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
            <h3>공지사항 리스트</h3>
            <CButton component='a' color={'dark'} onClick={handleShowModal}>
              공지사항 추가하기
            </CButton>
          </div>
          <CSmartTable
            columns={columns}
            itemsPerPage={ITEMS_PER_PAGE}
            items={noticeList}
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
              setting: (item: INoticeItem) => {
                const handleDelete = () => {
                  deleteNoticeApi(item.noticeId)
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
        <NoticeModal
          showModal={showModal}
          onClose={handleCloseModal}
          title={'이벤트 추가'}
          eventId={selectedEventId}
          isEditMode={isEditMode}
          item={noticeInfo}
        />
      )}
    </S.Wrap>
  )
}

export default Notice
