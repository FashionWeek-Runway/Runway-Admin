import {IImageResponse} from '../models/Exhibition'
import {IBannerCreateResponse, IBannerItem, IBannerListResponse} from './../models/Banner'
import request from './core'
import {JWT_KEY} from '../config/constant'

export const getEventList = async <T>(size: number, page: number): Promise<T> => {
  const url = `/admin/events?page=${page}&size=${size}`
  return request.get<T>(url, {headers: {'X-AUTH-TOKEN': `${window.localStorage.getItem(JWT_KEY)}`}})
}

export const getEventItem = async (bannerIdx: number): Promise<IBannerItem> => {
  const url = `/admin/events/${bannerIdx}`
  return request.get<IBannerItem>(url)
}

export const createEvent = async <T>(data: FormData): Promise<T> => {
  const url = '/admin/events'
  return request.post<T>(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const updateEvent = async <T>(bannerId: number, data: FormData): Promise<T> => {
  const url = `/admin/events/${bannerId}`
  return request.patch<T>(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const deleteEvent = async (bannerId: number) => {
  const url = `/admin/events/${bannerId}`
  console.log(url)
  return request.delete(url, {headers: {'X-AUTH-TOKEN': `${window.localStorage.getItem(JWT_KEY)}`}})
}
