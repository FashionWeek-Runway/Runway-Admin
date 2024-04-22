import {cilHamburgerMenu} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CContainer,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CNavItem,
} from '@coreui/react'
import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {Link, useLocation} from 'react-router-dom'
import {useTypedSelector} from '../../store'
// import packageJson from '../../../package.json'

const HEADER_TITLE = {
  '/dashboard': '대시보드',
  '/user-management': '유저 관리',
  '/reservation': '프로젝트 관리',
  '/donation-temporary': '임시 기부 관리',
  '/exhibition': '기획전 관리',
}

const Header = () => {
  const dispatch = useDispatch()
  const sidebarShow = useTypedSelector(state => state.sidebarShow)
  const location = useLocation()

  const [visible, setVisible] = useState(false)
  const [headerTitle, setHeaderTitle] = useState('')

  useEffect(() => {
    setHeaderTitle(HEADER_TITLE[location.pathname as keyof typeof HEADER_TITLE])
  }, [location.pathname])

  return (
    <CHeader position='sticky' className='mb-4'>
      <CContainer fluid>
        <CHeaderToggler className='ps-1' onClick={() => dispatch({type: 'set', sidebarShow: !sidebarShow})}>
          <CIcon icon={cilHamburgerMenu} size='lg' />
        </CHeaderToggler>
        <CHeaderNav className='d-none d-md-flex me-auto'>
          <CNavItem className='d-flex'>
            <p className='m-auto'>{headerTitle}</p>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className='px-3'>
          <CButton onClick={() => setVisible(!visible)}>로그아웃</CButton>
          <CModal visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader>
              <CModalTitle>로그아웃</CModalTitle>
            </CModalHeader>
            <CModalBody>정말로 로그아웃 하시겠습니까?</CModalBody>
            <CModalFooter>
              <CButton color='secondary' onClick={() => setVisible(false)}>
                취소
              </CButton>
              <Link to='/login'>
                <CButton color='primary' onClick={() => window.localStorage.clear()}>
                  확인
                </CButton>
              </Link>
            </CModalFooter>
          </CModal>
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default Header
