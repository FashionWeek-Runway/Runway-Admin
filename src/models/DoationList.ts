export type DoationList = {
  userId: number
  donationRequestId: number
  username: string
  phoneNumber: string
  email: string
  alarmMethod: boolean
  donationKind: number
  deposit: DepositStatus | string
  createdAt: string
}
export interface DonationInfo {
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
  regularStatus: string
  donationDate: string
}
export type DepositStatus = 'EXISTENCE' | 'NONEXISTENCE'

export type DonationStatus = 'EXECUTION_BEFORE' | 'EXECUTION_UNDER' | 'EXECUTION_SUCCESS' | 'EXECUTION_REFUND'

export type getDonationListResponse = {
  isLast: boolean
  totalCnt: number
  contents: DoationList[]
}

export type DonationRequest = {
  donationRequestId: number
  name: string
  amount: string
}
