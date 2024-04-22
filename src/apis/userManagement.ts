import axios from 'axios'
import {JWT_KEY} from '../config/constant'
import request from './core'

export const getUserDetail = async <T>(userIdx: string): Promise<T> => {
  const url = `/admin/users/${userIdx}`
  return await request.get<T>(url, {headers: {'X-AUTH-TOKEN': `${window.localStorage.getItem(JWT_KEY)}`}})
}

export const getUserDonationInfo = async <T>(userId: string): Promise<T> => {
  const url = `/admin/users/donations/${userId}`
  return await request.get<T>(url, {headers: {'X-AUTH-TOKEN': `${window.localStorage.getItem(JWT_KEY)}`}})
}

export const getDonationLists = async <T>(userId: string | undefined, size: number, page: number): Promise<T> => {
  const url = `/admin/users/flame/${userId}?page=${page}&size=${size}`
  return await request.get<T>(url, {headers: {'X-AUTH-TOKEN': `${window.localStorage.getItem(JWT_KEY)}`}})
}

export const updateUserDetail = async <T>(userIdx: number): Promise<T> => {
  const url = `/admin/user/${userIdx}`
  const data = null
  return await request.patch<T>(url, data, {headers: {'X-AUTH-TOKEN': `${window.localStorage.getItem(JWT_KEY)}`}})
}

export const getUserList = async <T>(
  size: number,
  page: number,
  content?: string,
  status?: string,
  accountStatus?: UserStatus,
): Promise<T> => {
  const url = `/admin/users?${content === '' || content === 'null' ? '' : 'content=' + String(content) + '&'}
  ${status == null ? '' : 'status=' + String(status) + '&'}page=${page}&size=${size}`
  console.log(url)
  return await request.get<T>(url, {headers: {'X-AUTH-TOKEN': `${window.localStorage.getItem(JWT_KEY)}`}})
}

export const downloadUserListCsv = async (
  size: number,
  page: number,
  content?: string,
  accountStatus?: UserStatus | 'ALL',
) => {
  const url = `${process.env.REACT_APP_API}/admin/user/csv?${
    content === '' || content === 'null' ? '' : 'content=' + String(content) + '&'
  }${accountStatus === 'ALL' ? '' : 'status=' + String(accountStatus) + '&'}page=${page}&size=${size}`

  return await axios.get(url, {
    headers: {'X-AUTH-TOKEN': `${window.localStorage.getItem(JWT_KEY)}`, accept: 'text/csv;charset=utf-8;'},
    responseType: 'blob',
  })
}

export const updateBirth = async (userId: number, birth: string) => {
  const url = `/admin/users/birth/${userId}?birth=${birth}`
  return await request.patch(url, {headers: {'X-AUTH-TOKEN': `${window.localStorage.getItem(JWT_KEY)}`}})
}

export const updateEmail = async (userId: number, email: string) => {
  const url = `/admin/users/email/${userId}?email=${email}`
  return await request.patch(url, {headers: {'X-AUTH-TOKEN': `${window.localStorage.getItem(JWT_KEY)}`}})
}

export const updatePhone = async (userId: number, phone: string) => {
  const url = `/admin/users/phone/${userId}?phone=${phone}`
  return await request.patch(url, {headers: {'X-AUTH-TOKEN': `${window.localStorage.getItem(JWT_KEY)}`}})
}

export const updateGender = async (userId: number, gender: string) => {
  const url = `/admin/users/gender/${userId}?gender=${gender}`
  return await request.patch(url, {headers: {'X-AUTH-TOKEN': `${window.localStorage.getItem(JWT_KEY)}`}})
}

export const updateNickname = async (userId: number, nickname: string) => {
  const url = `/admin/users/nickname/${userId}?nickname=${nickname}`
  return await request.patch(url, {headers: {'X-AUTH-TOKEN': `${window.localStorage.getItem(JWT_KEY)}`}})
}
