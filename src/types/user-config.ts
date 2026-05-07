import type { CommonResponse } from "./common"

export type UserConfig = {
  id: string,
  config: {
    initial_amount: number,
    income_limit_per_day: number,
    expense_limit_per_day: number,
    income_limit_per_month: number,
    expense_limit_per_month: number
  }
}

export type CreateUserConfigFieldType = {
  expense_limit_per_day: number,
  expense_limit_per_month: number,
  income_limit_per_day: number,
  income_limit_per_month: number,
  initial_amount: number,
}

export type UpdateUserConfigFieldType = CreateUserConfigFieldType

export type CreateUserConfigByIdResponse = CommonResponse<{ id: string }>
export type UpdateUserConfigByIdResponse = CommonResponse<UserConfig>