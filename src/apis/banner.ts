import {IImageResponse} from '../models/Exhibition'
import {IBannerCreateResponse, IBannerItem, IBannerListResponse} from './../models/Banner'
import request from './core'
import {JWT_KEY} from '../config/constant'

export const getBannerList = async <T>(size: number, page: number): Promise<T> => {
  const url = `/admin/banners?page=${page}&size=${size}`
  return request.get<T>(url, {headers: {'X-AUTH-TOKEN': `${window.localStorage.getItem(JWT_KEY)}`}})
}

export const getBannerItem = async (bannerIdx: number): Promise<IBannerItem> => {
  const url = `/admin/banners/${bannerIdx}`
  return request.get<IBannerItem>(url)
}

export const getBannerImage = async (fileString: string): Promise<IImageResponse> => {
  const url = `/admin/banners/images?file=${fileString}`
  return request.get<IImageResponse>(url)
}

export const createBanner = async <T>(data: FormData): Promise<T> => {
  const url = '/admin/banners'
  return request.post<T>(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const updateBanner = async <T>(bannerId: number, data: FormData): Promise<T> => {
  const url = `/admin/banners/${bannerId}`
  return request.patch<T>(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const deleteBanner = async (bannerId: number) => {
  const url = `/admin/banners/${bannerId}`
  console.log(url)
  return request.delete(url, {headers: {'X-AUTH-TOKEN': `${window.localStorage.getItem(JWT_KEY)}`}})
}
