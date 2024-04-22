export interface ProjectImgList {
  imgId: number
  imgUrl: string
  sequence: number
}

export interface ProjectList {
  projectId: number
  projectName: string
  usages: string
  totalDonationCnt: number
  totalAmount: number
  projectStatus: string
  regularStatus: string
  status: string
}

export interface ProjectDetailInfo {
  projectId: number
  projectName: string
  detail: string
  usages: string
  startDate: any
  endDate: any
  projectStatus: ProjectStatus | string
  regularStatus: RegularStatus | string
  status: Status | string
  searchKeyword: string
  totalDonationCnt: number
  totalAmount: number
  regularDonationCnt: number
  projectImgLists: ProjectImgList[]
}

export interface ProjectDetail {
  projectId: number
  projectName: string
  detail: string
  usages: string
  startDate: any
  endDate: any
  projectStatus: ProjectStatus | string
  regularStatus: RegularStatus | string
  status: Status | string
  searchKeyword: string
  totalDonationCnt: number
  totalAmount: number
  regularDonationCnt: number
}

export interface ProjectUploadForm {
  projectName: string
  detail: string
  usages: string
  startDate: any
  endDate: any
  regularStatus: RegularStatus | string
  projectKind: string
  searchKeyword: string
}

export interface ProjectPageResponse {
  isLast: boolean
  totalCnt: number
  contents: ProjectList[]
}

export interface DonationList {
  donationId: number
  userId: number
  name: string
  email: string
  phoneNumber: string
  amount: number
  inherenceNumber: string
  inherenceName: string
  payMethod: string
  donationStatus: string
  donationStatusValue: string
  regularStatus: string
  donationDate: string
}

export interface DonationPageResponse {
  isLast: boolean
  totalCnt: number
  contents: DonationList[]
}

export type DeleteStatus = 'ACTIVE' | 'INACTIVE'

type ProjectStatus = 'BEFORE_START' | 'PROCEEDING' | 'DEADLINE'
type RegularStatus = 'REGULAR' | 'ONE_TIME'
type Status = 'ACTIVE' | 'INACTIVE'

export type NameSearchFilter = 'name'
