import React from 'react'
import Keyword from './pages/keyword/Keyword'
import Notice from './pages/notice/Notice'

const Dashboard = React.lazy(() => import('./pages/dashboard/Dashboard'))
const UserManagement = React.lazy(() => import('./pages/userManagement'))
const DonationManagement = React.lazy(() => import('./pages/donationTemporary'))
const UserManagementDetail = React.lazy(() => import('./pages/userManagement/userManagementDetail'))
const DonationTemporaryManagemnetDetail = React.lazy(
  () => import('./pages/donationTemporary/donationTemporaryManagementDetail'),
)
const DonationManagementDetail = React.lazy(() => import('./pages/donationDetail/donationManagementDetail'))
const ProjectUpload = React.lazy(() => import('./pages/projectUpload/ProjectUpload'))
const Project = React.lazy(() => import('./pages/projectManagement/index'))
const ProjectDetail = React.lazy(() => import('./pages/projectManagement/projectDetail'))
const Space = React.lazy(() => import('./pages/space/Space'))
const Banner = React.lazy(() => import('./pages/banner/Banner'))
const DonationTemporaryManagementPost = React.lazy(() => import('./pages/donationTemporary/donationPost'))
const Event = React.lazy(() => import('./pages/event/Event'))
const routes = [
  {path: '/', name: 'Home'},
  {path: '/dashboard', name: 'Dashboard', component: Dashboard},
  {path: '/user-management', name: 'UserManagement', component: UserManagement},
  {path: '/project-management', name: 'ProjectManagement', component: Project},
  {path: '/project-management/:id', name: 'ProjectManagement', component: ProjectDetail},
  {path: '/project-management/registration', name: 'ProjectManagement', component: ProjectUpload},
  {path: '/project-management/donation/:id', name: 'DonationManagementDetail', component: DonationManagementDetail},
  {path: '/user-management/:id', name: 'UserManagement', component: UserManagementDetail},
  {path: '/donation-temporary', name: 'DonationManagement', component: DonationManagement},
  {path: '/donation-temporary/:id', name: 'DonationManagement', component: DonationTemporaryManagemnetDetail},
  {path: '/donation-temporary/registration/:id', name: DonationManagement, component: DonationTemporaryManagementPost},
  {path: '/space', name: 'Space', component: Space},
  {path: '/banner', name: 'Banner', component: Banner},
  {path: '/event', name: 'Event', component: Event},
  {path: '/keyword', name: 'Keyword', component: Keyword},
  {path: '/notice', name: 'Notice', component: Notice},
]

export default routes
