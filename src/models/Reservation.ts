type ReservationListResponse = {
  isSuccess: boolean
  code: number
  message: string
  result: ReservationElement[]
}

type ReservationElement = {
  reservationIdx: number
  name: string
  email: string
  phoneNumber: string
  state: ReservationStatus
}

type ReservationStatus = 'review' | 'finish' | 'cancel'

type ReservationPostResponse = {
  isSuccess: boolean
  code: number
  message: string
  result: string
}
