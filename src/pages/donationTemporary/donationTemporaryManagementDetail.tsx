import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormFeedback,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {getDonationDetail, postDonation} from '../../apis/donationManagement'
import {InfoBox, InfoBoxContent, InfoBoxTitle, Title} from './styles'
import {DoationList} from '../../models/DoationList'

const INFOBOXTITLE = {
  donationRequestId: '번호',
  userId: '유저 인덱스',
  email: '이메일',
  phoneNumber: '전화번호',
  username: '이름',
  alarmMethod: '알림 방법',
  donationKind: '기부 종류',
  deposit: '입금 유무',
  createdAt: '기부 신청 시간',
}
const DonationTemporaryManagementDetail = (): JSX.Element => {
  const [editStatus, setEditStatus] = useState<UserStatus | string>('ACTIVE')
  const [mode, setMode] = useState('detail')
  const [donatinoDetailInfo, setDonationDetailInfo] = useState<DoationList | undefined>()
  const params = useParams()
  const donationRequestId = params.id
  const navigate = useNavigate()
  useEffect(() => {
    const userDetailApi = async () => {
      try {
        if (typeof donationRequestId === 'undefined') {
          alert('없는 유저입니다.')
          navigate(-1)
        } else {
          const response = await getDonationDetail<DoationList>(donationRequestId)
          setDonationDetailInfo(response)
          console.log(response.donationRequestId)
        }
      } catch (error) {
        alert(`${error.message}`)
      }
    }
    userDetailApi()
  }, [donationRequestId])

  // ... 이전 코드 ...

  return (
    <>
      <CContainer>
        <CRow className='my-3'>
          <CCol className='d-flex justify-content-between'>
            <Title>기부 상세 정보</Title>
            <div>
              {mode === 'detail' && (
                <CButton
                  color='primary'
                  onClick={() => {
                    const donationRequestId = params.id
                    if (donationRequestId) {
                      navigate(`/donation-temporary/registration/${donationRequestId}`)
                    }
                  }}
                  style={{marginRight: '10px'}} // 오른쪽으로 10px 간격 추가
                >
                  입금 등록
                </CButton>
              )}
              {mode === 'detail' && (
                <CButton
                  color='primary'
                  onClick={() => {
                    if (donatinoDetailInfo?.userId) {
                      navigate(`/user-management/${donatinoDetailInfo.userId}`)
                    }
                  }}
                >
                  입금 유저 정보
                </CButton>
              )}
            </div>
          </CCol>
        </CRow>
        <CRow>
          {donatinoDetailInfo ? (
            Object.entries(donatinoDetailInfo).map(([key, value]) => {
              return (
                <InfoBox key={`infoBox-${key}`} className='my-1'>
                  <InfoBoxTitle>{INFOBOXTITLE[key as keyof typeof INFOBOXTITLE]}</InfoBoxTitle>
                  <InfoBoxContent>{value}</InfoBoxContent>
                </InfoBox>
              )
            })
          ) : (
            <p>Loading...</p> // 데이터가 로딩 중일 때 표시할 내용
          )}
        </CRow>
      </CContainer>
    </>
  )
}

export default DonationTemporaryManagementDetail
