/* eslint-disable prettier/prettier */
import {cilListFilter, cilSearch} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {CButton, CCol, CContainer, CFormInput, CFormSelect, CRow} from '@coreui/react'
import React, {useEffect, useState} from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {getDonationList} from '../../apis/donationManagement'
import {CSmartPagination} from '../../components/custom/pagination/CSmartPagination'
import {CSmartTable} from '../../components/custom/smart-table/CSmartTable'
import {CustomButton, Label} from './styles'
import { DepositStatus, DoationList, getDonationListResponse } from "../../models/DoationList";

const DonationStatus = {
  EXISTENCE: '입급완료',
  NONEXISTENCE: '입금 미완료',
}

const SIZE = 10

const columns = [
  {
    label: '번호',
    key: 'donationRequestId',
    _style: {width: '10%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '이름',
    key: 'username',
    _style: {width: '25%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '전화번호',
    key: 'phoneNumber',
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
    label: '알림 받을 방법',
    key: 'alarmMethod',
    _style: {width: '35%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '기부 후원 분야',
    key: 'donationKind',
    _style: {width: '35%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '입금 유무',
    key: 'deposit',
    _style: {width: '35%'},
    _props: {className: 'fw-semibold'},
  },
  {
    label: '기부 시작 시간',
    key: 'createdAt',
    _style: {width: '100%'},
    _props: {className: 'fw-semibold'},
  },
]

type Filter = {
  page: number
  keyword: string
  status: DepositStatus | 'ALL'
  size: number
}

const DonationManagement = (): JSX.Element => {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<Filter>({page: 1, keyword: '', status: 'ALL', size: 20})
  const [sortBy, setSortBy] = useState('latest')
  const [donationList, setDonationList] = useState<DoationList[]>([])
  const [pageNum, setPageNum] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams()

  function checkDonationStatus(status: string | null): status is DepositStatus | 'ALL' {
    console.log(status)
    return status === 'EXISTENCE' || status === 'NONEXISTENCE' || status === 'ALL'
  }

  useEffect(() => {
    const status = searchParams.get('status')
    const size = Number(searchParams.get('size'))
    const currentFilter = {
      page: Number(searchParams.get('page')) < 1 ? 1 : Number(searchParams.get('page')),
      keyword: String(searchParams.get('keyword')) === 'null' ? '' : String(searchParams.get('keyword')),
      status: checkDonationStatus(status) ? status : 'ALL',
      size: calibratedPageSize(size),
    }
    setFilter(currentFilter)
    getDonationListApi(currentFilter)
  }, [searchParams])

  const calibratedPageSize = (size: number) => {
    if (size < 10) return 10
    else if (size > 1000) return 1000
    return size
  }

  const getDonationListApi = async ({page, keyword, status, size}: Filter) => {
    try {
      const response = await getDonationList<getDonationListResponse>(size, page - 1, keyword, status)
      const resDonationList = response.contents.map(donationInfo => {
        const value = {
          ...donationInfo,
          status: DonationStatus[donationInfo.deposit as keyof typeof DonationStatus],
          nickname: donationInfo.username ?? '',
        }
        return value
      })
      console.log(response.totalCnt)
      setDonationList([...resDonationList])
      setPageNum(Math.ceil(response?.totalCnt / SIZE))
    } catch (error) {
      alert(`${error.message}`)
      navigate('/login')
    }
  }

  const updateDonationStatus = (status: DepositStatus) => {
    if (filter.status === 'EXISTENCE') {
      if (status === 'NONEXISTENCE') {
        setFilter(prev => {
          return {
            ...prev,
            status: 'ALL',
          }
        })
      } else {
        setFilter(prev => {
          return {
            ...prev,
            status: 'NONEXISTENCE',
          }
        })
      }
    } else if (filter.status === 'NONEXISTENCE') {
      if (status === 'EXISTENCE') {
        setFilter(prev => {
          return {
            ...prev,
            status: 'ALL',
          }
        })
      } else {
        setFilter(prev => {
          return {
            ...prev,
            status: 'EXISTENCE',
          }
        })
      }
    } else if (filter.status === 'ALL') {
      if (status === 'EXISTENCE') {
        setFilter(prev => {
          return {
            ...prev,
            status: 'NONEXISTENCE',
          }
        })
      } else {
        setFilter(prev => {
          return {
            ...prev,
            status: 'EXISTENCE',
          }
        })
      }
    }
  }

  return (
    <div>
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
            <Label className='my-2'>입금 상태</Label>
            <div className='d-flex gap-2'>
              <CustomButton
                className={`px-3 ${filter.status !== 'NONEXISTENCE' ? 'selected' : ''}`}
                color=''
                onClick={() => updateDonationStatus('EXISTENCE')}
              >
                입금완료
              </CustomButton>
              <CustomButton color="primary"
                            className={`${filter.status !== 'EXISTENCE' ? 'selected' : ''}`}
                            onClick={() => updateDonationStatus('NONEXISTENCE')}
              >
                입금 미완료
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
                  console.log("상태",keyword, status)
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
          items={donationList}
          clickableRows={true}
          onRowClick={item => navigate(`${item.donationRequestId}`)}
          tableHeadProps={{color: 'primary'}}
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
            console.log(searchParams)
            setSearchParams(searchParams)
          }}
          activePage={filter.page}
        ></CSmartPagination>
      </CContainer>
    </div>
  )
}

export default DonationManagement
