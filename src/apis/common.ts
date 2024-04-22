import request from './core'
import {JWT_KEY} from '../config/constant'

export const uploadImage = async <T>(data: FormData): Promise<T> => {
  const url = `/admin/img`
  return request.post<T>(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
