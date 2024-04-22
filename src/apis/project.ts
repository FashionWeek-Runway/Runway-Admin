import request from './core'
import {JWT_KEY} from '../config/constant'
export const getProjectList = async <T>(size: number, page: number): Promise<T> => {
  const url = `/admin/projects?page=${page}&size=${size}`
  return await request.get<T>(url, {headers: {'X-AUTH-TOKEN': `${window.localStorage.getItem(JWT_KEY)}`}})
}

export const getProjectDetail = async <T>(projectId: string): Promise<T> => {
  const url = `/admin/projects/${projectId}`
  return await request.get<T>(url, {headers: {'X-AUTH-TOKEN': `${window.localStorage.getItem(JWT_KEY)}`}})
}

export const getDonationList = async <T>(projectId: string | undefined, size: number, page: number): Promise<T> => {
  const url = `/admin/projects/donation-users/${projectId}?page=${page}&size=${size}`
  return await request.get<T>(url, {headers: {'X-AUTH-TOKEN': `${window.localStorage.getItem(JWT_KEY)}`}})
}

export const deleteProject = async <T>(projectId: string | undefined): Promise<void> => {
  const url = `/admin/projects/${projectId}`
  await request.delete<T>(url, {headers: {'X-AUTH-TOKEN': `${window.localStorage.getItem(JWT_KEY)}`}})
}

export const activeProject = async <T>(projectId: string | undefined): Promise<void> => {
  const url = `/admin/projects/activation/${projectId}`
  await request.patch<T>(url, {headers: {'X-AUTH-TOKEN': `${window.localStorage.getItem(JWT_KEY)}`}})
}

export const createProject = async <T>(data: FormData): Promise<void> => {
  const url = `/admin/projects`
  await request.post<T>(url, data, {
    headers: {
      'X-AUTH-TOKEN': `${window.localStorage.getItem(JWT_KEY)}`,
      'Content-Type': 'application/form-data',
    },
  })
}
