import {IImageResponse} from '../models/Exhibition'
import {IBannerCreateResponse, IBannerItem, IBannerListResponse} from './../models/Banner'
import request from './core'
import {JWT_KEY} from '../config/constant'

export const getNoticeList = async <T>(size: number, page: number): Promise<T> => {
  const url = `/admin/notices?page=${page}&size=${size}`
  return request.get<T>(url, {headers: {'X-AUTH-TOKEN': `${window.localStorage.getItem(JWT_KEY)}`}})
}

export const createNotice = async <T>(data: FormData): Promise<T> => {
  const url = '/admin/notices'
  return request.post<T>(url, data)
}

export const updateNotice = async <T>(noticeId: number, data: FormData): Promise<T> => {
  const url = `/admin/notices/${noticeId}`
  return request.patch<T>(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const deleteNotice = async (noticeId: number) => {
  const url = `/admin/notices/${noticeId}`
  console.log(url)
  return request.delete(url, {headers: {'X-AUTH-TOKEN': `${window.localStorage.getItem(JWT_KEY)}`}})
}
