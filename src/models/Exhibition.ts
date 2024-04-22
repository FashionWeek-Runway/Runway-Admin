import {ISpaceListItem} from './Space'

export type TExhibitionPlaceItem = Pick<ISpaceListItem, 'placeIdx' | 'placeName' | 'display'>

export interface IExhibitionItem {
  exhibitionName: string
  placeList: TExhibitionPlaceItem[]
  imageUrl: string
  display: boolean
  [key: string]: string | TExhibitionPlaceItem[] | number | boolean
}

export interface IExhibitionListItem extends IExhibitionItem {
  exhibitionIdx: number
}

export interface IExhibitionListResponse {
  totalPagesCnt: number
  getExhibitionAdminListRes: IExhibitionListItem[]
}

export interface IExhibitionCreateResponse {
  exhibitionIdx: number
}

export interface IExhibitionItemPostBody {
  postExhibitionAdminReq: IExhibitionItem
  photoUrl: 'string'
}

export interface IExhibitionItemPutBody {
  putExhibitionReq: Blob
  photoUrl: File | Blob | string
}

export interface IImageResponse {
  headers: Record<string, string[]>
  body: string
}
