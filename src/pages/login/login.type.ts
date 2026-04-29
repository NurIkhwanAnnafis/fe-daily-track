export type FieldType = {
  email: string;
  password: string;
  remember: boolean;
}

export type LoginPayload = {
  email: string
  password: string
}

export type LogoutPayload = {
  refresh_token: string
}

export type LoginResponse = {
  message: string
  data: {
    access_token: string
    refresh_token: string
    user_id: string
  }
}