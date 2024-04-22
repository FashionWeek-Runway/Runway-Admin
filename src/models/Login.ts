type LoginRequest = {
  email: string
  password: string
}

type LoginResponse = {
  id: number
  accessToken: string
  refreshToken: string
}
