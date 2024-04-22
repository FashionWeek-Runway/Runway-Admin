export interface IBannerItem {
  bannerId: number
  bannerImg: string
  name: string
  bannerType: string
  contentsUrl: string
  startDate: string
  endDate: string
  [key: string]: string | number | boolean | undefined
}

export interface IBannerCreateResponse {
  bannerIdx: number
}

export interface IBannerListResponse {
  isLast: boolean
  totalCnt: number
  contents: IBannerItem[]
}
