export type FieldType = {
  email: string;
  password: string;
  remember: boolean;
}

export type LoginPayload = {
  email: string
  password: string
}

export type LoginResponse = {
  success: boolean
  message: string
  data: {
    accessToken: string
    refreshToken: string
  }
}