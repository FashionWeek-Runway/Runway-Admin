import axios, {AxiosInstance, AxiosInterceptorManager, AxiosRequestConfig, AxiosResponse} from 'axios'
import {JWT_KEY} from '../../config/constant'

class customError extends Error {
  constructor(public code: number, public message: string) {
    super(message)
    this.code = code
  }

  getCode() {
    return this.code
  }
  getMessage() {
    return this.message
  }
}

type BaseResponse<T = any> = {
  isSuccess: boolean
  code: number
  message: string
  result: T
}

interface CustomInstance extends AxiosInstance {
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse<BaseResponse>>
  }
  getUri(config?: AxiosRequestConfig): string
  request<T>(config: AxiosRequestConfig): Promise<T>
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>
  head<T>(url: string, config?: AxiosRequestConfig): Promise<T>
  options<T>(url: string, config?: AxiosRequestConfig): Promise<T>
  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
  patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
}

const request: CustomInstance = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 3000,
  headers: {
    accept: 'application/json',
    'X-AUTH-TOKEN': `${window.localStorage.getItem(JWT_KEY)}`,
  },
})

request.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  },
)

request.interceptors.response.use(
  response => {
    // 요청이 성공적으로 처리되었을 때
    if (response.data.isSuccess) {
      return response.data.result
    } else {
      // 에러가 발생했을 때 customError 인스턴스를 생성합니다.
      const errorInstance = new customError(response.data.code, response.data.message)
      return Promise.reject(errorInstance)
    }
  },
  error => {
    // 네트워크 에러나 서버 에러 등 axios 요청 자체에서 오류가 발생했을 때
    // 에러 메시지를 브라우저의 alert으로 띄우기
    if (error.response) {
    } else if (error.request) {
      // 요청이 이루어 졌으나 응답을 받지 못한 경우
      alert('서버로부터 응답을 받지 못했습니다.')
    } else {
      // 요청을 만드는 중에 오류가 발생한 경우
      alert('요청 중에 오류가 발생했습니다.')
    }

    return Promise.reject(error)
  },
)
export default request
