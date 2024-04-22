export interface ISpaceListItem {
  placeIdx: number
  placeUrl: string
  bookable: boolean
  placeName: string
  display: boolean
  [key: string]: string | number | boolean
}

export interface ISpaceListResponse {
  totalPageCnt: number
  getPlaceListRes: ISpaceListItem[]
}

export interface IKeywordItem {
  keywordIdx: number
  keyword: string
}

export interface ISpaceItem {
  placeIdx?: number
  placeName: string
  placeExplain: string
  placeInfo: string
  placeCost: number
  placeAddress: string
  placeUrl: string
  placeMinReserveDate: number
  placeLocation: string
  placeConcept: string
  placeCategory: string
  placeOperationWeekDayStartDateTime: string
  placeOperationWeekDayEndDateTime: string
  placeOperationWeekEndStartDateTime: string
  placeOperationWeekEndEndDateTime: string
  placeFootTraffic: string
  placeNearbyInfo: string
  placeCaution: string
  placeRefundPolicy: string
  a3CanvasCount: number
  placeFloor: number | string
  isElevatorExistence: boolean
  isParkingLotExistence: boolean
  placeImageList: string[]
  placeKeywordList: IKeywordItem[]
  pcanvasCount: number
  bookable: boolean
  display: boolean
  [key: string]: string | number | (string | number)[] | boolean | IKeywordItem[] | undefined
}

export interface ISpaceCreateResponse {
  placeIdx: number
}

export type TSpaceSearchFilter = 'location' | 'name' | 'keyword'
