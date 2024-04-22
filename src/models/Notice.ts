export interface INoticeItem {
  noticeId: number
  title: string
  noticeType: string
  noticeDate: string
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
export interface INoticeListResponse {
  isLast: boolean
  totalCnt: number
  contents: INoticeItem[]
}
