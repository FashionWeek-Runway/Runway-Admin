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
    name: '쇼룸 관리',
    icon: <CIcon icon={cilWallet} customClassName='nav-icon' />,
    to: '/store-management',
  },
]

export default _nav
