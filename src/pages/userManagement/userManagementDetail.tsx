import {
  CButton,
  CCol,
  CNavItem,
  CRow,
  CNavLink,
  CNav,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableRow,
  CContainer,
} from '@coreui/react'
import React, {useEffect, useState} from 'react'
import {useNavigate, useParams, useSearchParams} from 'react-router-dom'
import {getDonationLists, getUserDetail, getUserDonationInfo} from '../../apis/userManagement'
import EditModal from './userEditModal'
import '../../scss/_custom.scss'
import {IParams, project_columns} from '../projectManagement/projectDetail'
import {CSmartTable} from '../../components/custom/smart-table/CSmartTable'
import {CSmartPagination} from '../../components/custom/pagination/CSmartPagination'

const INFOBOXTITLE = {
  userId: '번호',
  name: '이름',
  email: '이메일',
  nickname: '닉네임',
  birth: '생일 정보',
  socialType: '가입 유형',
  phoneNumber: '전화번호',
  gender: '성별',
  status: '계정 상태',
  createdAt: '가입 날짜',
}

const AccountStatus = {
  ACTIVE: '활성화',
  INACTIVE: '비활성화',
  true: '등록 됨',
  false: '등록 안됨',
}

const DONATIONINFO = {
  regularCnt: '진행중인 정기 기부 수',
  totalCnt: '기부 총 횟수',
  totalAmount: '기부 총 금액',
  card: '결제 등록',
}

export const flame_columns = [
  {
    label: '번호',
    key: 'donationId',
    _style: {width: '2%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '고유 번호',
    key: 'inherenceNumber',
    _style: {width: '20%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '고유 이름',
    key: 'inherenceName',
    _style: {width: '20%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '생성 횟수',
    key: 'donationCnt',
    _style: {width: '5%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '기부 상태',
    key: 'donationStatus',
    _style: {width: '10%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '기부 상태',
    key: 'donationStatusName',
    _style: {width: '5%'},
    _props: {className: 'fw-semibold'},
  },
]

const FLAME_LISTS = {
  donationId: '기부 ID',
  donationCnt: '생성 횟수',
  inherenceName: '불꽃이 이름',
  inherenceNumber: '불꽃이 번호',
  donationStatusName: '기부 상태',
}

export const ITEMS_PER_PAGE = 10

const UserManagementDetail = (): JSX.Element => {
  const [userDetailInfo, setUserDetailInfo] = useState<UserDetailInfo | undefined>()
  const [userDonationInfo, setUserDonationInfo] = useState<UserDonationInfo | undefined>()
  const [userFlameList, setFlameLists] = useState<UserFlameList[] | undefined>()
  const params = useParams()
  const userId = params.id
  const navigate = useNavigate()
  const [showEditModal, setShowEditModal] = useState(false)
  const [fieldToEdit, setFieldToEdit] = useState('')
  const [editValue, setEditValue] = useState('')
  const [title, setTitle] = useState('')
  const [activeTab, setActiveTab] = useState('userInfo') // 'userInfo' 또는 'userDonation'
  const [searchParams, setSearchParams] = useSearchParams()
  const [filter, setFilter] = useState<IParams>({page: 1, size: ITEMS_PER_PAGE})
  const [pageNum, setPageNum] = useState(1)

  const renderTabContent = () => {
    switch (activeTab) {
      case 'userInfo':
        return renderUserInfo()
      case 'userDonation':
        return renderUserDonationInfo()
      default:
        return null
    }
  }

  useEffect(() => {
    const userDetailApi = async () => {
      try {
        if (typeof userId === 'undefined') {
          alert('없는 유저입니다.')
          navigate(-1)
        } else {
          const response = await getUserDetail<UserDetailInfo>(userId)
          setUserDetailInfo(response)
        }
      } catch (error) {
        alert(error.response.data.message)
      }
    }
    userDetailApi()
  }, [userId])

  useEffect(() => {
    const userDonationApi = async () => {
      try {
        if (typeof userId === 'undefined') {
          alert('없는 유저입니다.')
          navigate(-1)
        } else {
          const response = await getUserDonationInfo<UserDonationInfo>(userId)
          setUserDonationInfo(response)
        }
      } catch (error) {
        alert(error.response.data.message)
      }
    }

    const status = searchParams.get('status')
    const size = Number(searchParams.get('size'))
    const currentFilter = {
      page: Number(searchParams.get('page')) < 1 ? 1 : Number(searchParams.get('page')),
      size: calibratedPageSize(size),
    }

    userDonationApi()
  }, [userId])

  useEffect(() => {
    const size = Number(searchParams.get('size'))
    const currentFilter = {
      page: Number(searchParams.get('page')) < 1 ? 1 : Number(searchParams.get('page')),
      size: calibratedPageSize(size),
    }
    setFilter(currentFilter)
    getDonationListApi(currentFilter)
  }, [searchParams])

  const getDonationListApi = async ({page, size}: IParams) => {
    try {
      if (typeof userId === 'undefined') {
        alert('없는 유저입니다.')
        navigate(-1)
      }
      const response = await getDonationLists<UserFlameListResponse>(userId, size, page - 1)
      const resDonationLists = response.contents
      setFlameLists([...resDonationLists])
      setPageNum(Math.ceil(response?.totalCnt / ITEMS_PER_PAGE))
    } catch (error) {
      alert(`${error.message}`)
    }
  }
  const handleEditButtonClick = (title: string, field: string, value: string) => {
    setTitle(title)
    console.log(field)
    setFieldToEdit(field)
    setEditValue(value)
    setShowEditModal(true)
  }

  const renderUserInfo = () => {
    return (
      <CRow className={'bg-white'}>
        <CCol>
          <h2>유저 정보</h2>
          <CTable align='middle' className='mb-0 border bg-white' hover responsive>
            <CTableBody>
              {typeof userDetailInfo !== 'undefined' &&
                Object.entries(userDetailInfo).map(([key, value]) => {
                  const isEditable = ['birth', 'email', 'gender', 'phoneNumber', 'nickname'].includes(key)
                  return (
                    <CTableRow key={`infoBox-${key}`}>
                      <CTableDataCell color={'dark'}>{INFOBOXTITLE[key as keyof typeof INFOBOXTITLE]}</CTableDataCell>
                      <CTableDataCell className='d-flex justify-content-between align-items-center'>
                        <span>
                          {key === 'status' || key === 'card'
                            ? AccountStatus[value as keyof typeof AccountStatus]
                            : value}
                        </span>
                        {isEditable && (
                          <CButton
                            size='sm'
                            color='dark'
                            onClick={() =>
                              handleEditButtonClick(INFOBOXTITLE[key as keyof typeof INFOBOXTITLE], key, value)
                            }
                          >
                            수정
                          </CButton>
                        )}
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
            </CTableBody>
          </CTable>
        </CCol>
      </CRow>
    )
    // 유저 정보 렌더링 로직
  }

  // 유저 기부 정보를 렌더링하는 함수
  const renderUserDonationInfo = () => {
    return (
      <CRow className={'bg-white'}>
        <CCol md={3}>
          <h3>기부 정보</h3>
          <CTable align='middle' className='mb-3 border bg-white' hover responsive>
            <CTableBody>
              {typeof userDonationInfo !== 'undefined' &&
                Object.entries(userDonationInfo).map(([key, value]) => {
                  return (
                    <CTableRow key={`infoBox-${key}`}>
                      <CTableDataCell color={'dark'} width={160}>
                        {DONATIONINFO[key as keyof typeof DONATIONINFO]}
                      </CTableDataCell>
                      <CTableDataCell className='d-flex justify-content-between align-items-center'>
                        <span>
                          {key === 'status' || key === 'card'
                            ? AccountStatus[value as keyof typeof AccountStatus]
                            : value}
                        </span>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
            </CTableBody>
          </CTable>
        </CCol>
        <CCol>
          <h3>불꽃이 정보</h3>
          <CSmartTable
            className={'bg-white'}
            columns={flame_columns}
            itemsPerPage={ITEMS_PER_PAGE}
            items={userFlameList}
            clickableRows={false}
            tableHeadProps={{color: 'dark'}}
            tableProps={{
              hover: true,
              responsive: true,
            }}
          />
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
      </CRow>
    )
  }

  const calibratedPageSize = (size: number) => {
    if (size < 10) return 10
    else if (size > 1000) return 1000
    return size
  }
  // 모달을 열고 닫는 함수
  return (
    <>
      <CNav variant='tabs' className='mb-3'>
        <CNavItem>
          <CNavLink
            className={`nav-link nav-link-spacing ${activeTab === 'userInfo' ? 'active' : ''}`}
            onClick={() => setActiveTab('userInfo')}
          >
            유저 정보
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            className={`nav-link nav-link-spacing ${activeTab === 'userDonation' ? 'active' : ''}`}
            onClick={() => setActiveTab('userDonation')}
          >
            유저 기부 정보
          </CNavLink>
        </CNavItem>
      </CNav>
      {renderTabContent()}
      {showEditModal && (
        <EditModal
          visible={showEditModal}
          title={`${title} 수정`}
          fieldToEdit={fieldToEdit}
          initialValue={editValue}
          onClose={() => setShowEditModal(false)}
          userId={userId}
        />
      )}
    </>
  )
}

export default UserManagementDetail
