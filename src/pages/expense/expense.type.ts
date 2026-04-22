import type { Dayjs } from "dayjs"
import type { CommonParams, CommonResponseList } from "../../types/common"

export type Expense = {
  id: string
  description: string | null
  category: {
    id: string
    name: string
  } | null
  amount: number
  date: string
  created_at: string
  updated_at: string | null
}

export type GetExpensesParams = CommonParams & {
  type: number
  category_id?: string
  transaction_date?: string
}

export type GetExpensesResponse = CommonResponseList<Expense>

export type ExpenseDetail = {
  id: string
  merchant_name: string
  amount: number
  date: string
  description: string
  created_at: string
  updated_at: any
  type: {
    id: number
    name: string
  }
  status: {
    id: number
    name: string
  }
  category: {
    id: string
    name: string
  }
}

export type CreateExpenseResponse = {
  id: string
}

export type UpdateExpenseResponse = {
  id: string
}

export type GetExpenseDetailResponse = ExpenseDetail

export type DeleteExpenseResponse = {
  id: string
}

export type ExpenseFilter = {
  category_id: number | null
  transaction_date: Date
}

export type ExpenseFieldType = {
  merchant_name: string
  description?: string | null
  amount: number
  date: string | Dayjs
  category_id: string
}
