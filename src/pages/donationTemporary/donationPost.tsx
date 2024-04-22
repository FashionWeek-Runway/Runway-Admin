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
import {postDonation} from '../../apis/donationManagement'
import {DoationList} from '../../models/DoationList'

const DonationTemporaryManagementDetail = (): JSX.Element => {
  const [editStatus, setEditStatus] = useState<UserStatus | string>('ACTIVE')
  const [mode, setMode] = useState('detail')
  const [donatinoDetailInfo, setDonationDetailInfo] = useState<DoationList | undefined>()
  const params = useParams()
  const donationRequestId = parseInt(params.id as string)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')

  const handleSubmit = async () => {
    try {
      if (!name) {
        alert('이름을 입력해 주세요.')
        return
      }

      if (!amount) {
        alert('금액을 입력해 주세요.')
        return
      }

      const response = await postDonation<string>({
        donationRequestId,
        name,
        amount,
      })

      navigate(`/donation-temporary/${donationRequestId}`)
    } catch (error) {
      alert(`${error.message}`)
    }
  }
  // ... 이전 코드 ...

  return (
    <div className='bg-light min-vh-100 d-flex flex-row align-items-center'>
      <CContainer>
        <CRow className='justify-content-center'>
          <CCol md={4}>
            <CCardGroup>
              <CCard className='p-4'>
                <CCardBody>
                  <CForm>
                    <h2 className='mb-4'>기부 등록 폼</h2>
                    <CInputGroup className='mb-3'>
                      <CInputGroupText>기부 번호</CInputGroupText>
                      <CFormInput
                        type='text'
                        id='donationRequestId'
                        placeholder='기부 번호를 입력해주세요.'
                        autoComplete='off'
                        maxLength={50}
                        value={donationRequestId}
                        readOnly // 읽기 전용 필드로 설정
                      />
                    </CInputGroup>
                    <CInputGroup className='mb-3'>
                      <CInputGroupText>이름</CInputGroupText>
                      <CFormInput
                        type='text'
                        id='name'
                        placeholder='이름을 입력해주세요.'
                        autoComplete='off'
                        maxLength={50}
                        value={name}
                        onChange={e => setName(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className='mb-3'>
                      <CInputGroupText>금액</CInputGroupText>
                      <CFormInput
                        type='text'
                        id='amount'
                        placeholder='금액을 입력해주세요.'
                        autoComplete='off'
                        maxLength={50}
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                      />
                    </CInputGroup>
                    {/* 다른 필드 (name, amount) 입력 필드 추가 */}
                    {/* ... */}
                    <div className='d-grid'>
                      <CButton color='primary' onClick={handleSubmit}>
                        등록
                      </CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
export default DonationTemporaryManagementDetail
