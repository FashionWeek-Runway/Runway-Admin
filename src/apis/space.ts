import {IImageResponse} from '../models/Exhibition'
import {IKeywordItem, ISpaceCreateResponse, ISpaceItem, ISpaceListResponse, TSpaceSearchFilter} from '../models/Space'
import request from './core'

export const getSpaceList = async (
  size: number | null = null,
  page: number | null = null,
  searchKey: string | null = null,
  filter: TSpaceSearchFilter | null = null,
): Promise<ISpaceListResponse> => {
  const url = `/admin/places/search?size=${size ? size : ''}&page=${page ? page - 1 : ''}&searchKey=${
    searchKey ? searchKey : ''
  }&filter=${filter ? filter : ''}`
  return request.get<ISpaceListResponse>(url)
}

export const getSpaceItem = async (placeIdx: number): Promise<ISpaceItem> => {
  const url = `/admin/places/${placeIdx}`
  return request.get<ISpaceItem>(url)
}

export const getSpaceKeywordList = async (): Promise<IKeywordItem[]> => {
  const url = '/admin/places/keyword'
  return request.get<IKeywordItem[]>(url)
}

export const getSpaceImage = async (fileString: string): Promise<IImageResponse> => {
  const url = `/admin/places/images?file=${fileString}`
  return request.get<IImageResponse>(url)
}

export const createSpaceItem = async (data: FormData): Promise<ISpaceCreateResponse> => {
  const url = 'admin/places'
  return request.post<ISpaceCreateResponse>(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const updateSpaceItem = async (placeIdx: number, data: FormData): Promise<number> => {
  const url = `admin/places/${placeIdx}`
  return request.put<number>(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const deleteSpace = async (placeIdx: number): Promise<string> => {
  const url = `/admin/places/${placeIdx}`
  return request.delete<string>(url)
}
