import {cilLockLocked, cilUser} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
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
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {login} from '../../apis/login'

const Login = () => {
  const navigate = useNavigate()

  const [email, setId] = useState('')
  const [password, setPassword] = useState('')

  const onKeyPress = (event: {key: string}) => {
    if (event.key === 'Enter') {
      handleSubmit().then()
    }
  }

  const handleSubmit = async () => {
    try {
      if (!email) {
        alert('email 입력해 주세요.')
        return
      }

      if (!password) {
        alert('패스워드를 입력해 주세요.')
        return
      }

      const response = await login<LoginResponse>({email, password})
      window.localStorage.setItem('jwt', response.accessToken)

      navigate(`/dashboard`)
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <div className='bg-light min-vh-100 d-flex flex-row align-items-center'>
      <CContainer>
        <CRow className='justify-content-center'>
          <CCol md={4}>
            <CCardGroup>
              <CCard className='p-4'>
                <CCardBody>
                  <CForm>
                    <h2 className='mb-4'>MATCH 관리자 로그인</h2>
                    <CInputGroup className='mb-3'>
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type='id'
                        id='id'
                        placeholder='email을 입력해주세요.'
                        autoComplete='on'
                        maxLength={50}
                        onChange={e => setId(e.target.value)}
                      />
                      <CFormFeedback invalid>ID를 올바르게 입력해주세요.</CFormFeedback>
                    </CInputGroup>
                    <CInputGroup className='mb-4'>
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type='password'
                        id='password'
                        placeholder='비밀번호를 입력해주세요.'
                        autoComplete='off'
                        onKeyPress={onKeyPress}
                        maxLength={20}
                        onChange={e => setPassword(e.target.value)}
                      />
                      <CFormFeedback invalid>비밀번호를 올바르게 입력해주세요.</CFormFeedback>
                    </CInputGroup>
                    <div className='d-grid'>
                      <CButton color='primary' onClick={handleSubmit}>
                        로그인
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

export default Login
