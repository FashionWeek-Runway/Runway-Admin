import axios from 'axios'
import {JWT_KEY} from '../config/constant'
import request from './core'
import {DepositStatus, DonationRequest} from '../models/DoationList'
export const updateDonationDetail = async <T>(userIdx: number): Promise<T> => {
  const url = `/admin/user/${userIdx}`
  const data = null
  return await request.patch<T>(url, data, {headers: {'X-AUTH-TOKEN': `${window.localStorage.getItem(JWT_KEY)}`}})
}

export const getDonationList = async <T>(
  size: number,
  page: number,
  content?: string,
  depositStatus?: DepositStatus | 'ALL',
): Promise<T> => {
  const url = `/admin/donation-temporaries?${
    content === '' || content === 'null' ? '' : 'content=' + String(content) + '&'
  }${depositStatus === 'ALL' ? '' : 'deposit=' + String(depositStatus) + '&'}page=${page}&size=${size}`
  console.log(depositStatus)
  console.log(url)
  return await request.get<T>(url, {headers: {'X-AUTH-TOKEN': `${window.localStorage.getItem(JWT_KEY)}`}})
}

export const postDonation = async <T>(data: DonationRequest): Promise<string> => {
  const url = '/admin/donation-temporaries'
  return await request.post<string>(url, data, {
    headers: {'X-AUTH-TOKEN': `${window.localStorage.getItem(JWT_KEY)}`},
  })
}

export const getDonationDetail = async <T>(donationRequestId: string): Promise<T> => {
  const url = `/admin/donation-temporaries/${donationRequestId}`
  return await request.get<T>(url, {headers: {'X-AUTH-TOKEN': `${window.localStorage.getItem(JWT_KEY)}`}})
}

export const getDonationInfo = async <T>(donationId: string): Promise<T> => {
  const url = `/admin/donations/${donationId}`
  return await request.get<T>(url, {headers: {'X-AUTH-TOKEN': `${window.localStorage.getItem(JWT_KEY)}`}})
}

export const updateDonationStatus = async <T>(donationId: number, donationStatus: string): Promise<T> => {
  const url = `/admin/order/${donationId}?donationStatus=${donationStatus}`
  return await request.patch<T>(url, {headers: {'X-AUTH-TOKEN': `${window.localStorage.getItem(JWT_KEY)}`}})
}
