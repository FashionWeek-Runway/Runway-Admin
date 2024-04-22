import {JWT_KEY} from '../config/constant'
import request from './core'

export const getDashboard = async <T>(): Promise<T> => {
  const url = `/admin/users/info`
  return await request.get<T>(url, {headers: {'X-AUTH-TOKEN': `${window.localStorage.getItem(JWT_KEY)}`}})
}

export const getDonationDashboard = async <T>(): Promise<T> => {
  const url = `/admin/donations`
  return await request.get<T>(url, {headers: {'X-AUTH-TOKEN': `${window.localStorage.getItem(JWT_KEY)}`}})
}

export const getRegularInfo = async <T>(): Promise<T> => {
  const url = `/admin/donations/regular`
  return await request.get<T>(url, {headers: {'X-AUTH-TOKEN': `${window.localStorage.getItem(JWT_KEY)}`}})
}
