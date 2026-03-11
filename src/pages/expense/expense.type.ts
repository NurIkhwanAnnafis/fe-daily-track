import type { CommonResponseList } from "../../types/common"

export type Expense = {
  id: string
  name: string
  description: string | null
  category: {
    id: string
    name: string
  } | null
  amount: number
  transaction_date: string
  created_at: string
  updated_at: string | null
}

export type GetExpensesParams = {
  page: number
  page_size: number
  category_id?: string
  keyword?: string
  transaction_date?: string
}

export type GetExpensesResponse = CommonResponseList<Expense>
