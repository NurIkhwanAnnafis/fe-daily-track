export type AccountDetailsFieldType = {
  email: string
  first_name: string
  last_name: string
  password?: string
  confirm_password?: string
}

export type UserConfigFieldType = {
  initial_amount: number
  expense_limit_per_day: number
  expense_limit_per_month: number
  income_limit_per_day: number
  income_limit_per_month: number
}