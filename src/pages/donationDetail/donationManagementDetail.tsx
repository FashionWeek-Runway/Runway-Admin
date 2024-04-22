import {CButton, CCol, CContainer, CFormSelect, CRow} from '@coreui/react'
import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {getUserDetail, updateUserDetail} from '../../apis/userManagement'
import {InfoBox, InfoBoxContent, InfoBoxTitle, Title} from './styles'
import {DonationInfo, DonationStatus} from '../../models/DoationList'
import {getDonationInfo, updateDonationStatus} from '../../apis/donationManagement'

const INFOBOXTITLE = {
  donationId: '번호',
  userId: '유저 번호',
  name: '이름',
  email: '이메일',
  phoneNumber: '전화번호',
  amount: '기부 금',
  inherenceNumber: '고유 번호',
  inherenceName: '고유 이름',
  payMethod: '기부 결제 방법',
  donationStatus: '기부 상태',
  regularStatus: '기부 종류',
  donationDate: '기부 날짜',
}

const Status = {
  ACTIVE: '활성화',
  INACTIVE: '비활성화',
  NOT: '옵션을 선택해 주세요',
  EXECUTION_BEFORE: '기부 집행 전',
  EXECUTION_UNDER: '기부 집행 중',
  EXECUTION_SUCCESS: '집행 완료',
  EXECUTION_REFUND: '기부금 환불',
  ONE_TIME: '일회성 후원',
  REGULAR: '정기 후원',
}

const DonationManagementDetail = (): JSX.Element => {
  const [editStatus, setEditStatus] = useState<DonationStatus | string>('EXECUTION_BEFORE')
  const [mode, setMode] = useState('detail')
  const [donationDetailInfo, setDonationDetailInfo] = useState<DonationInfo | undefined>()
  const params = useParams()
  const donationId = params.id
  const navigate = useNavigate()

  useEffect(() => {
    const donationDetailApi = async () => {
      try {
        if (typeof donationId === 'undefined') {
          alert('없는 기부입니다.')
          navigate(-1)
        } else {
          const response = await getDonationInfo<DonationInfo>(donationId)
          setDonationDetailInfo(response)
        }
      } catch (error) {
        alert(`${error.message}`)
      }
    }
    donationDetailApi()
  }, [donationId])

  const handleEditCompleteButton = async () => {
    console.log(editStatus)
    if (donationDetailInfo !== undefined && editStatus !== donationDetailInfo.regularStatus) {
      await updateDonationStatus(Number(donationDetailInfo.donationId), editStatus)
      setDonationDetailInfo(prev => {
        return typeof prev !== 'undefined' ? {...prev, status: editStatus} : prev
      })
    }
    alert('수정되었습니다.')
    setMode('detail')
    window.location.reload()
  }

  const handleEditStatusChange = (value: string) => {
    if (
      value === 'EXECUTION_BEFORE' ||
      value === 'EXECUTION_SUCCESS' ||
      value === 'EXECUTION_UNDER' ||
      value === 'EXECUTION_REFUND' ||
      value === 'NOT'
    ) {
      console.log(value)
      setEditStatus(value)
    } else if (value === 'NOT') {
      alert('Option을 선택해주세요')
    }
  }

  return (
    <>
      <CContainer>
        <CRow className='my-3'>
          <CCol className='d-flex justify-content-between'>
            <Title>
              <b>기부금 상세 정보</b>
            </Title>
            {mode === 'edit' ? (
              <div className='d-flex gap-2'>
                <CButton color='dark' onClick={() => setMode('detail')}>
                  뒤로 가기
                </CButton>
                <CButton onClick={handleEditCompleteButton} disabled={editStatus === 'NOT'}>
                  수정 완료
                </CButton>
              </div>
            ) : (
              <CButton onClick={() => setMode('edit')}>수정 시작</CButton>
            )}
          </CCol>
        </CRow>
        <CRow>
          {typeof donationDetailInfo !== 'undefined' ? (
            Object.entries(donationDetailInfo).map(([key, value]) => {
              return mode === 'edit' && key === 'donationStatus' ? (
                <InfoBox key={`infoBox-${key}-${mode}`} className='my-1'>
                  <InfoBoxTitle>{INFOBOXTITLE[key as keyof typeof INFOBOXTITLE]}</InfoBoxTitle>
                  <CFormSelect
                    className='select'
                    aria-label='account-status'
                    defaultValue={editStatus}
                    onChange={e => {
                      handleEditStatusChange(e.target.value)
                    }}
                  >
                    <option value='NOT'>옵션을 선택해 주세요</option>
                    <option value='EXECUTION_BEFORE'>기부 집행 전</option>
                    <option value='EXECUTION_UNDER'>기부 집행 중</option>
                    <option value='EXECUTION_SUCCESS'>집행 완료</option>
                    <option value='EXECUTION_REFUND'>환불</option>
                  </CFormSelect>
                </InfoBox>
              ) : (
                <InfoBox key={`infoBox-${key}-${mode}`} className='my-1'>
                  <InfoBoxTitle>{INFOBOXTITLE[key as keyof typeof INFOBOXTITLE]}</InfoBoxTitle>
                  <InfoBoxContent>
                    {key === 'donationStatus' ? Status[value as keyof typeof Status] : value}
                  </InfoBoxContent>
                </InfoBox>
              )
            })
          ) : (
            <></>
          )}
        </CRow>
      </CContainer>
    </>
  )
}

export default DonationManagementDetail
