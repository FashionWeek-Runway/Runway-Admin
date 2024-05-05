type LoginRequest = {
  phone: string
  password: string
}

type LoginResponse = {
  userId: number
  accessToken: string
  refreshToken: string
}
