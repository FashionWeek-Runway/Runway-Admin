import request from './core'

export const login = async <T>(data: LoginRequest): Promise<T> => {
  const url = '/admin/auth/logIn'
  return await request.post<T>(url, data)
}
