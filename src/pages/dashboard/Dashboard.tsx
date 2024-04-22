import {cilMoney, cilUserPlus} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {CButton, CCard, CCardBody, CCardText, CCardTitle, CContainer, CRow} from '@coreui/react'
import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {getDashboard, getDonationDashboard, getRegularInfo} from '../../apis/dashboard'

const Dashboard = () => {
  const [dashboardInfo, setDashboardInfo] = useState<dashboardInfo>({
    totalUserCnt: 0,
    oneDayUserCnt: 0,
    weekUserCnt: 0,
    monthUserCnt: 0,
    deleteUserCnt: 0,
  })
  const [donationDashboardInfo, setDonationDashboardInfo] = useState<donationDashboardInfo>({
    oneDayDonation: 0,
    weekDonation: 0,
    monthDonation: 0,
    totalDonation: 0,
  })
  const [regularInfo, setRegularInfo] = useState<regularInfo>({
    beforeCnt: 0,
    underCnt: 0,
    successCnt: 0,
    successAmount: '',
    regularCnt: 0,
    regularAmount: '',
    beforeMonthRegularCnt: 0,
    beforeMonthRegularAmount: '',
  })

  const navigate = useNavigate()

  useEffect(() => {
    const dashboardApi = async () => {
      try {
        const {totalUserCnt, oneDayUserCnt, weekUserCnt, monthUserCnt, deleteUserCnt} =
          await getDashboard<getDashboardResponse>()
        const {oneDayDonation, weekDonation, monthDonation, totalDonation} =
          await getDonationDashboard<getDonationDashboardResponse>()
        const {
          beforeCnt,
          underCnt,
          successCnt,
          successAmount,
          regularCnt,
          regularAmount,
          beforeMonthRegularCnt,
          beforeMonthRegularAmount,
        } = await getRegularInfo<regularInfo>()
        setDashboardInfo({totalUserCnt, oneDayUserCnt, weekUserCnt, monthUserCnt, deleteUserCnt})
        setDonationDashboardInfo({oneDayDonation, weekDonation, monthDonation, totalDonation})
        setRegularInfo({
          beforeCnt,
          underCnt,
          successCnt,
          successAmount,
          regularCnt,
          regularAmount,
          beforeMonthRegularCnt,
          beforeMonthRegularAmount,
        })
      } catch (error) {
        alert(`${error.message}`)
        navigate('/login')
      }
    }
    dashboardApi()
  }, [])

  const handleGa4BtnClick = () => {
    window.open(
      'https://analytics.google.com/analytics/web/provision/?authuser=1&pli=1#/p360600939/reports/reportinghub?params=_u..nav%3Dmaui',
    )
  }

  return (
    <CContainer className='my3'>
      {/*<CButton onClick={handleGa4BtnClick} className='my-3'>
        GA4로 이동
      </CButton>*/}
      <CRow className='d-flex gap-4 my-3'>
        <CCard style={{width: '15rem'}}>
          <CCardBody>
            <CCardTitle className='d-flex justify-content-end'>
              <CIcon icon={cilUserPlus} size='xxl' className=''></CIcon>
            </CCardTitle>
            <CCardTitle className='h4'>{dashboardInfo.totalUserCnt.toLocaleString()}</CCardTitle>
            <CCardText>총 가입자</CCardText>
          </CCardBody>
        </CCard>
        <CCard style={{width: '15rem'}}>
          <CCardBody>
            <CCardTitle className='d-flex justify-content-end'>
              <CIcon icon={cilUserPlus} size='xxl' className=''></CIcon>
            </CCardTitle>
            <CCardTitle className='h4'>{dashboardInfo.oneDayUserCnt.toLocaleString()}</CCardTitle>
            <CCardText>하루 신규 가입자</CCardText>
          </CCardBody>
        </CCard>
        <CCard style={{width: '15rem'}}>
          <CCardBody>
            <CCardTitle className='d-flex justify-content-end'>
              <CIcon icon={cilUserPlus} size='xxl' className=''></CIcon>
            </CCardTitle>
            <CCardTitle className='h4'>{dashboardInfo.weekUserCnt.toLocaleString()}</CCardTitle>
            <CCardText>일주일 신규가입자</CCardText>
          </CCardBody>
        </CCard>
        <CCard style={{width: '15rem'}}>
          <CCardBody>
            <CCardTitle className='d-flex justify-content-end'>
              <CIcon icon={cilUserPlus} size='xxl' className=''></CIcon>
            </CCardTitle>
            <CCardTitle className='h4'>{dashboardInfo.monthUserCnt.toLocaleString()}</CCardTitle>
            <CCardText>한 달 신규 가입자</CCardText>
          </CCardBody>
        </CCard>
        <CCard style={{width: '15rem'}}>
          <CCardBody>
            <CCardTitle className='d-flex justify-content-end'>
              <CIcon icon={cilUserPlus} size='xxl' className=''></CIcon>
            </CCardTitle>
            <CCardTitle className='h4'>{dashboardInfo.deleteUserCnt.toLocaleString()}</CCardTitle>
            <CCardText>총 탈퇴자</CCardText>
          </CCardBody>
        </CCard>
      </CRow>
      <CRow className='d-flex gap-4 my-5'>
        <CCard style={{width: '15rem'}}>
          <CCardBody>
            <CCardTitle className='d-flex justify-content-end'>
              <CIcon icon={cilMoney} size='xxl' className=''></CIcon>
            </CCardTitle>
            <CCardTitle className='h4'>{donationDashboardInfo.oneDayDonation.toLocaleString()}</CCardTitle>
            <CCardText>하루 기부 금액</CCardText>
          </CCardBody>
        </CCard>
        <CCard style={{width: '15rem'}}>
          <CCardBody>
            <CCardTitle className='d-flex justify-content-end'>
              <CIcon icon={cilMoney} size='xxl' className=''></CIcon>
            </CCardTitle>
            <CCardTitle className='h4'>{donationDashboardInfo.weekDonation.toLocaleString()}</CCardTitle>
            <CCardText>일주일 기부 금액</CCardText>
          </CCardBody>
        </CCard>
        <CCard style={{width: '15rem'}}>
          <CCardBody>
            <CCardTitle className='d-flex justify-content-end'>
              <CIcon icon={cilMoney} size='xxl' className=''></CIcon>
            </CCardTitle>
            <CCardTitle className='h4'>{donationDashboardInfo.monthDonation.toLocaleString()}</CCardTitle>
            <CCardText>한 달 기부 금액</CCardText>
          </CCardBody>
        </CCard>
        <CCard style={{width: '15rem'}}>
          <CCardBody>
            <CCardTitle className='d-flex justify-content-end'>
              <CIcon icon={cilMoney} size='xxl' className=''></CIcon>
            </CCardTitle>
            <CCardTitle className='h4'>{donationDashboardInfo.totalDonation.toLocaleString()}</CCardTitle>
            <CCardText>총 모금 금액</CCardText>
          </CCardBody>
        </CCard>
      </CRow>
      <CRow className='d-flex gap-4 my-5'>
        <CCard style={{width: '15rem'}}>
          <CCardBody>
            <CCardTitle className='d-flex justify-content-end'>
              <CIcon icon={cilMoney} size='xxl' className=''></CIcon>
            </CCardTitle>
            <CCardTitle className='h4'>{regularInfo.beforeCnt + ' 건'}</CCardTitle>
            <CCardText>분류 대기 건</CCardText>
          </CCardBody>
        </CCard>
        <CCard style={{width: '15rem'}}>
          <CCardBody>
            <CCardTitle className='d-flex justify-content-end'>
              <CIcon icon={cilMoney} size='xxl' className=''></CIcon>
            </CCardTitle>
            <CCardTitle className='h4'>{regularInfo.underCnt + ' 건'}</CCardTitle>
            <CCardText>지출 레디 건</CCardText>
          </CCardBody>
        </CCard>
        <CCard style={{width: '15rem'}}>
          <CCardBody>
            <CCardTitle className='d-flex justify-content-end'>
              <CIcon icon={cilMoney} size='xxl' className=''></CIcon>
            </CCardTitle>
            <CCardTitle className='h4'>{regularInfo.successCnt + ' 건'}</CCardTitle>
            <CCardText>집행 완료 건</CCardText>
          </CCardBody>
        </CCard>
        <CCard style={{width: '15rem'}}>
          <CCardBody>
            <CCardTitle className='d-flex justify-content-end'>
              <CIcon icon={cilMoney} size='xxl' className=''></CIcon>
            </CCardTitle>
            <CCardTitle className='h4'>{regularInfo.successAmount}</CCardTitle>
            <CCardText>집행 완료 금액</CCardText>
          </CCardBody>
        </CCard>
      </CRow>
      <CRow className='d-flex gap-4 my-5'>
        <CCard style={{width: '15rem'}}>
          <CCardBody>
            <CCardTitle className='d-flex justify-content-end'>
              <CIcon icon={cilMoney} size='xxl' className=''></CIcon>
            </CCardTitle>
            <CCardTitle className='h4'>{regularInfo.regularCnt + ' 건'}</CCardTitle>
            <CCardText>현재 정기 기부 중</CCardText>
          </CCardBody>
        </CCard>
        <CCard style={{width: '15rem'}}>
          <CCardBody>
            <CCardTitle className='d-flex justify-content-end'>
              <CIcon icon={cilMoney} size='xxl' className=''></CIcon>
            </CCardTitle>
            <CCardTitle className='h4'>{regularInfo.regularAmount}</CCardTitle>
            <CCardText>현재 정기 기부금</CCardText>
          </CCardBody>
        </CCard>
        <CCard style={{width: '15rem'}}>
          <CCardBody>
            <CCardTitle className='d-flex justify-content-end'>
              <CIcon icon={cilMoney} size='xxl' className=''></CIcon>
            </CCardTitle>
            <CCardTitle className='h4'>{regularInfo.beforeMonthRegularCnt + ' 건'}</CCardTitle>
            <CCardText>전월 정기 기부 건</CCardText>
          </CCardBody>
        </CCard>
        <CCard style={{width: '15rem'}}>
          <CCardBody>
            <CCardTitle className='d-flex justify-content-end'>
              <CIcon icon={cilMoney} size='xxl' className=''></CIcon>
            </CCardTitle>
            <CCardTitle className='h4'>{regularInfo.beforeMonthRegularAmount}</CCardTitle>
            <CCardText>전월 정기 기부금</CCardText>
          </CCardBody>
        </CCard>
      </CRow>
    </CContainer>
  )
}

export default Dashboard
