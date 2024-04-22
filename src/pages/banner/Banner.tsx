// Banner.tsx
import React, {useEffect, useState} from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {CButton, CCol, CContainer, CImage, CModal, CModalBody} from '@coreui/react'
import {deleteBanner, getBannerList} from '../../apis/banner'
import {IBannerItem, IBannerListResponse} from '../../models/Banner'
import {CSmartTable} from '../../components/custom/smart-table/CSmartTable'
import * as S from './Banner.styled'
import {IParams} from '../projectManagement/projectDetail'
import {CSmartPagination} from '../../components/custom/pagination/CSmartPagination'
import BannerModal from './BannerModal'

export const ITEMS_PER_PAGE = 10

const columns = [
  {
    label: '번호',
    key: 'bannerId',
    _style: {width: '5%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '사진',
    key: 'bannerImg',
    _style: {width: '30%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '랜딩 페이지',
    key: 'contentsUrl',
    _style: {width: '30%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '이름',
    key: 'name',
    _style: {width: '5%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '노출 기간',
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

function Banner() {
  const navigate = useNavigate()
  const [bannerList, setBannerList] = useState<IBannerItem[]>()
  const [searchParams, setSearchParams] = useSearchParams()
  const [filter, setFilter] = useState<IParams>({page: 1, size: ITEMS_PER_PAGE})
  const [pageNum, setPageNum] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [showImageModal, setImageModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')
  const [selectedBannerId, setSelectedBannerId] = useState<number>(0)
  const [isEditMode, setIsEditMode] = useState(false)
  const [bannerInfo, setBannerInfo] = useState<IBannerItem>({
    name: '',
    bannerId: 0,
    bannerImg: '',
    bannerName: '',
    bannerType: '',
    contentsUrl: '',
    display: true,
    endDate: '',
    startDate: '',
  })
  const handleShowModal = () => {
    setIsEditMode(false)
    setShowModal(true)
    setSelectedBannerId(0)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl)
    setImageModal(true)
  }

  const handleEdit = (item: IBannerItem) => {
    setIsEditMode(true)
    setShowModal(true)
    setBannerInfo(item)
    setSelectedBannerId(item.bannerId)
  }

  useEffect(() => {
    const fetchData = async () => {
      const size = Number(searchParams.get('size'))
      const currentFilter = {
        page: Number(searchParams.get('page')) < 1 ? 1 : Number(searchParams.get('page')),
        size: calibratedPageSize(size),
      }
      setFilter(currentFilter)
      getBannerListApi(currentFilter)
    }

    fetchData()
  }, [])

  useEffect(() => {
    // Fetch data based on selectedBannerId when it changes
    if (selectedBannerId !== undefined && selectedBannerId !== 0) {
      // Fetch data based on selectedBannerId (e.g., fetch from API)
      // Example: fetchData(selectedBannerId);
    }
  }, [selectedBannerId])

  const getBannerListApi = async ({page, size}: IParams) => {
    try {
      const response = await getBannerList<IBannerListResponse>(size, page - 1)
      setBannerList(response.contents)
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  const deleteBannerApi = async (bannerId: number | undefined) => {
    try {
      if (bannerId === undefined) {
        alert('삭제할 배너가 없습니다.')
        return // Stop function execution
      }
      const response: any = await deleteBanner(bannerId)
      alert('배너가 삭제 되었습니다.')
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
            <h3>배너 리스트</h3>
            <CButton component='a' color={'dark'} onClick={handleShowModal}>
              배너 추가하기
            </CButton>
          </div>
          <CSmartTable
            columns={columns}
            itemsPerPage={ITEMS_PER_PAGE}
            items={bannerList}
            clickableRows={true}
            tableHeadProps={{color: 'dark'}}
            tableProps={{
              hover: true,
              responsive: true,
              bgcolor: 'white',
            }}
            scopedColumns={{
              bannerImg: (item: IBannerItem) => {
                return (
                  <td onClick={() => handleImageClick(item.bannerImg)}>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                      <img src={item.bannerImg} style={{maxWidth: '100%', height: 'auto'}} />
                    </div>
                  </td>
                )
              },
              setting: (item: IBannerItem) => {
                const handleDelete = () => {
                  deleteBannerApi(item.bannerId)
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
              contentsUrl: (item: IBannerItem) => {
                return (
                  <td>
                    <a href={item.contentsUrl} onClick={handleLinkClick}>
                      {item.contentsUrl}
                    </a>
                  </td>
                )
              },
              bannerLinkUrl: (item: IBannerItem) => {
                return (
                  <td>
                    <a href={item.contentsUrl} onClick={handleLinkClick}>
                      {item.bannerLinkUrl}
                    </a>
                  </td>
                )
              },
              date: (item: IBannerItem) => {
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
        <BannerModal
          showModal={showModal}
          onClose={handleCloseModal}
          title={'배너 추가하기'}
          bannerId={selectedBannerId}
          isEditMode={isEditMode}
          item={bannerInfo}
        />
      )}
    </S.Wrap>
  )
}

export default Banner
