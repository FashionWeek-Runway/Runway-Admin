export interface IEventItem {
  eventId: number
  thumbnail: string
  title: string
  eventType: string
  smallTitle: string
  startDate: string
  endDate: string
  [key: string]: string | number | boolean | undefined
}

export class ContentsType {
  static readonly TEXT = 'TEXT'
  static readonly IMAGE = 'IMAGE'
}

export interface IEventContent {
  contentsType: ContentsType
  contents: string
}

export interface IEventCreateResponse {
  bannerIdx: number
}

export interface IEventListResponse {
  isLast: boolean
  totalCnt: number
  contents: IEventItem[]
}
