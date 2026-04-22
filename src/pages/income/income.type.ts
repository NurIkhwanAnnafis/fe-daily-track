import type { Dayjs } from "dayjs"
import type { CommonParams, CommonResponseList } from "../../types/common"

export type Income = {
  id: string
  merchant_name: string
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

export type IncomeDetail = {
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

export type GetIncomesParams = CommonParams & {
  type: number
  category_id?: string
  date?: string
}

export type GetIncomesResponse = CommonResponseList<Income>

export type CreateIncomesResponse = { id: string }
export type UpdateIncomesResponse = { id: string }
export type GetIncomesDetailResponse = IncomeDetail
export type DeleteIncomesResponse = { id: string }

export type IncomeFilter = {
  category_id: number | null
  date: Date
}

export type IncomeFieldType = {
  merchant_name: string
  description?: string | null
  amount: number
  date: string | Dayjs
  category_id: string
}
