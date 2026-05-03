export type UserLoginResponse = {
  token: string
  refresh_token: string
}

export type User = {
  id: string
  email: string
  first_name: string
  last_name: string
  role: string
  is_active: boolean
  created_at: string
  updated_at: string | null
  organization: {
    id: string
    name: string
  }
}