import {IImageResponse} from '../models/Exhibition'
import {IBannerCreateResponse, IBannerItem, IBannerListResponse} from './../models/Banner'
import request from './core'
import {JWT_KEY} from '../config/constant'

export const getKeywordList = async <T>(): Promise<T> => {
  const url = `/admin/keywords`
  return request.get<T>(url, {headers: {'X-AUTH-TOKEN': `${window.localStorage.getItem(JWT_KEY)}`}})
}

export const patchKeyword = async (keywordIdx: number, keyword: string): Promise<IBannerItem> => {
  const url = `/admin/keywords/${keywordIdx}?keyword=${keyword}`
  return request.patch<IBannerItem>(url)
}
