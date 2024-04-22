/* eslint-disable prettier/prettier */
import {cilListFilter, cilSearch} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {CButton, CCol, CContainer, CFormInput, CFormSelect, CRow} from '@coreui/react'
import React, {useEffect, useState} from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {downloadUserListCsv, getUserList} from '../../apis/userManagement'
import {CSmartPagination} from '../../components/custom/pagination/CSmartPagination'
import {CSmartTable} from '../../components/custom/smart-table/CSmartTable'
import {maskString} from '../../utils/utility'
import {CustomButton, Label} from './styles'

const AccountStatus = {
  ACTIVE: '활성화',
  INACTIVE: '비활성화',
}

const SIZE = 10

const columns = [
  {
    label: '번호',
    key: 'userId',
    _style: {width: '10%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '이름',
    key: 'name',
    _style: {width: '25%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '생일',
    key: 'birth',
    _style: {width: '35%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '가입타입',
    key: 'socialType',
    _style: {width: '35%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '성별',
    key: 'gender',
    _style: {width: '35%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '전화번호',
    key: 'phoneNumber',
    _style: {width: '35%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '카드 등록유무',
    key: 'card',
    _style: {width: '35%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '이메일',
    key: 'email',
    _style: {width: '35%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '기부 총 횟수',
    key: 'donationCnt',
    _style: {width: '35%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '기부 총액',
    key: 'totalAmount',
    _style: {width: '35%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '계정 상태',
    key: 'status',
    _style: {width: '30%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '생성날짜',
    key: 'createdAt',
    _style: {width: '35%'},
    _props: {className: 'fw-semibold'},
  },
]

type Filter = {
  page: number
  keyword: string
  status: UserStatus | 'ALL'
  size: number
}

const UserManagement = (): JSX.Element => {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<Filter>({page: 1, keyword: '', status: 'ALL', size: 20})
  const [sortBy, setSortBy] = useState('latest')
  const [userList, setUserList] = useState<UserInfo[]>([])
  const [pageNum, setPageNum] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams()

  function checkUserStatus(status: string | null): status is UserStatus | 'ALL' {
    return status === 'ACTIVE' || status === 'INACTIVE'
  }

  useEffect(() => {
    const status = searchParams.get('status')
    const size = Number(searchParams.get('size'))
    const currentFilter = {
      page: Number(searchParams.get('page')) < 1 ? 1 : Number(searchParams.get('page')),
      keyword: String(searchParams.get('keyword')) === 'null' ? '' : String(searchParams.get('keyword')),
      status: checkUserStatus(status) ? status : 'ALL',
      size: calibratedPageSize(size),
    }

    console.log(size)
    setFilter(currentFilter)
    getUserListApi(currentFilter)
  }, [searchParams])

  const calibratedPageSize = (size: number) => {
    if (size < 10) return 10
    else if (size > 1000) return 1000
    return size
  }

  const getUserListApi = async ({page, keyword, status, size}: Filter) => {
    try {
      const response = await getUserList<getUserListResponse>(size, page - 1, keyword, status)
      const resUserList = response.contents.map(userInfo => {
        let email = ''
        if (userInfo.email !== null) {
          const [emailUser, emailDomain] = userInfo.email.split('@')
          email = maskString(userInfo.email, 2, 'left')
        }
        const value = {
          ...userInfo,
          status: AccountStatus[userInfo.status as keyof typeof AccountStatus],
          email,
          nickname: userInfo.name ?? '',
        }
        return value
      })
      setUserList([...resUserList])
      setPageNum(Math.ceil(response?.totalCnt / SIZE))
    } catch (error) {
      alert(`${error.message}`)
      navigate('/login')
    }
  }

  const updateUserStatus = (status: UserStatus) => {
    if (filter.status === 'ACTIVE') {
      if (status === 'INACTIVE') {
        setFilter(prev => {
          return {
            ...prev,
          }
        })
      } else {
        setFilter(prev => {
          return {
            ...prev,
            status: 'INACTIVE',
          }
        })
      }
    } else if (filter.status === 'INACTIVE') {
      if (status === 'ACTIVE') {
        setFilter(prev => {
          return {
            ...prev,
          }
        })
      } else {
        setFilter(prev => {
          return {
            ...prev,
            status: 'ACTIVE',
          }
        })
      }
    } else if (filter.status === 'ALL') {
      if (status === 'ACTIVE') {
        setFilter(prev => {
          return {
            ...prev,
            status: 'INACTIVE',
          }
        })
      } else {
        setFilter(prev => {
          return {
            ...prev,
            status: 'ACTIVE',
          }
        })
      }
    }
  }

  const downloadCsvApi = async () => {
    setFilter(prev => {
      return {
        ...prev,
        size: calibratedPageSize(filter.size),
      }
    })
    const {data} = await downloadUserListCsv(
      calibratedPageSize(filter.size),
      filter.page - 1,
      filter.keyword,
      filter.status,
    )

    const csvData = new Blob([data as unknown as BlobPart], {type: 'text/csv;charset=utf-8;'})
    const csvURL = window.URL.createObjectURL(csvData)
    const tempLink = document.createElement('a')
    tempLink.href = csvURL
    tempLink.setAttribute('download', `회원 목록_${filter.status}_${filter.keyword}.csv`)
    tempLink.click()
  }

  return (
    <div className='full-width-container'>
      <CContainer className='my-3'>
        <CRow sm={{cols: 1}} className='my-3'>
          <CCol md={6}>
            <div className='my-2 d-flex gap-2 '>
              <CIcon icon={cilListFilter} size={'lg'} />
              <Label>정렬</Label>
            </div>
            <div className='w-75'>
              <CFormSelect size='sm' aria-label='sort-by' defaultValue={sortBy} disabled>
                <option value='latest' onClick={() => setSortBy('latest')}>
                  최신순
                </option>
              </CFormSelect>
            </div>
          </CCol>
          <CCol md={3}>
            <Label className='my-2'>계정 상태</Label>
            <div className='d-flex gap-2'>
              <CustomButton
                className={`px-3 ${filter.status !== 'INACTIVE' ? 'selected' : ''}`}
                color=''
                onClick={() => updateUserStatus('ACTIVE')}
              >
                활성
              </CustomButton>
              <CustomButton color="primary"
                className={`${filter.status !== 'ACTIVE' ? 'selected' : ''}`}
                onClick={() => updateUserStatus('INACTIVE')}
              >
                비활성
              </CustomButton>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol md={6}>
            <div className='my-2 d-flex'>
              <Label>조회 갯수</Label>
            </div>
            <div className='w-75'>
              <CFormInput
                type='number'
                id='size'
                value={filter.size}
                min={10}
                max={1000}
                onChange={e => {
                  setFilter(prev => {
                    return {
                      ...prev,
                      size: Number(e.target.value),
                    }
                  })
                }}
                placeholder='10 ~1000 범위로 입력해주세요.'
                autoComplete='off'
              />
            </div>
          </CCol>
          <CCol md={6}>
            <div className='my-2 d-flex gap-2'>
              <CIcon icon={cilSearch} size={'lg'}></CIcon>
              <Label>검색</Label>
            </div>
            <div className='d-flex gap-1'>
              <CFormSelect size='sm' aria-label='sort-by' className='w-25' disabled>
                <option value='name'>닉네임</option>
              </CFormSelect>
              <CFormInput
                placeholder='검색어를 입력해주세요.'
                className='w-75'
                onChange={e =>
                  setFilter(prev => {
                    return {
                      ...prev,
                      keyword: e.target.value,
                    }
                  })
                }
                value={filter.keyword}
              />
            </div>

            <div className='d-flex justify-content-end my-3'>
              {/*
              <CButton className='mx-3' onClick={downloadCsvApi}>
                CSV 다운로드
              </CButton>
              */}
              <CButton
                className='ml-3'
                onClick={() => {
                  const {keyword, status, size} = filter
                  setSearchParams({page: '1', keyword, status, size: String(calibratedPageSize(size))})
                }}
              >
                조회하기
              </CButton>
            </div>
          </CCol>
        </CRow>
      </CContainer>
      <CContainer>
        <CSmartTable
          columns={columns}
          itemsPerPage={SIZE}
          items={userList}
          clickableRows={true}
          onRowClick={item => navigate(`${item.userId}`)}
          tableHeadProps={{color: 'dark'}}
          tableProps={{
            hover: true,
            responsive: true,
            bgcolor: 'white',
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
      </CContainer>
    </div>
  )
}

export default UserManagement
