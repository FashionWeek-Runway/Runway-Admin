type UserInfo = {
  userId: number
  name: string
  birth: string
  socialType: string
  gender: string
  phoneNumber: string
  email: string
  card: boolean
  donationTotalCnt: number
  totalAmount: number
  status: UserStatus | string
  createdAt: any
}

type UserDetailInfo = {
  userId: number
  name: string
  birth: string
  socialType: string
  gender: string
  phoneNumber: string
  email: string
  card: boolean
  totalCnt: number
  totalAmount: number
  status: UserStatus | string
  createdAt: any
}

type UserFlameList = {
  donationId: number
  donationCnt: number
  inherenceName: string
  inherenceNumber: string
  donationStatus: string
  donationStatusName: string
}

type UserFlameListResponse = {
  isLast: boolean
  totalCnt: number
  contents: UserFlameList[]
}

type UserDonationInfo = {
  regularCnt: number
  totalCnt: number
  totalAmount: string
  isCard: boolean
}
type UserStatus = 'ACTIVE' | 'INACTIVE'

type getUserListResponse = {
  isLast: boolean
  totalCnt: number
  contents: UserInfo[]
}
