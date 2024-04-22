import {cilBook, cilSpeedometer, cilUser} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {CNavItem} from '@coreui/react'
import React, {ElementType} from 'react'
import {cilMenu, cilMoney, cilWallet} from '@coreui/icons/js/free'

export type Badge = {
  color: string
  text: string
}

export type NavItem = {
  component: string | ElementType
  name: string | JSX.Element
  icon?: string | JSX.Element
  badge?: Badge
  to: string
  items?: NavItem[]
}

const _nav = [
  {
    component: CNavItem,
    name: '대시보드',
    icon: <CIcon icon={cilSpeedometer} customClassName='nav-icon' />,
    badge: {
      color: 'info-gradient',
      text: 'NEW',
    },
    to: '/dashboard',
  },
  {
    component: CNavItem,
    name: '회원 관리',
    icon: <CIcon icon={cilUser} customClassName='nav-icon' />,
    to: '/user-management',
  },
  {
    component: CNavItem,
    name: '프로젝트 관리',
    icon: <CIcon icon={cilWallet} customClassName='nav-icon' />,
    to: '/project-management',
  },
  {
    component: CNavItem,
    name: '배너 관리',
    icon: <CIcon icon={cilBook} customClassName='nav-icon' />,
    to: '/banner',
  },
  {
    component: CNavItem,
    name: '아밴트 관리',
    icon: <CIcon icon={cilBook} customClassName='nav-icon' />,
    to: '/event',
  },
  {
    component: CNavItem,
    name: '공지사항 관리',
    icon: <CIcon icon={cilBook} customClassName='nav-icon' />,
    to: '/notice',
  },
  {
    component: CNavItem,
    name: '검색 키워드 관리',
    icon: <CIcon icon={cilBook} customClassName='nav-icon' />,
    to: '/keyword',
  },
  {
    component: CNavItem,
    name: '임시 기부 관리',
    icon: <CIcon icon={cilMoney} customClassName='nav-icon' />,
    to: '/donation-temporary',
  },

  /*
  {
    component: CNavItem,
    name: '추천 검색어 관리',
    icon: <CIcon icon={cilSpeedometer} customClassName='nav-icon' />,
    to: '/recommend',
  },
  {
    component: CNavItem,
    name: '키워드 관리',
    icon: <CIcon icon={cilSpeedometer} customClassName='nav-icon' />,
    to: '/keyword',
  },
  {
    component: CNavGroup,
    name: '테스트 관리',
    icon: <CIcon icon={cilBank} customClassName='nav-icon' />,
    items: [
      {
        component: CNavItem,
        name: '조회',
        to: '/test/test-list',
      },
      {
        component: CNavItem,
        name: '생성',
        to: '/test/create-test',
      },
    ],
  },*/
]

export default _nav
