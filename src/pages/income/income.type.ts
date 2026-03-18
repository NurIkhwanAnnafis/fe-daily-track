import type { CommonParams, CommonResponseList } from "../../types/common"

export type Income = {
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

export type GetIncomesParams = CommonParams & {
  type: number
  category_id?: string
  transaction_date?: string
}

export type GetIncomesResponse = CommonResponseList<Income>

export type IncomeFilter = {
  category_id: number | null
  transaction_date: Date
}
