import type { CommonParams, CommonResponseList } from "../../types/common"

export type GetReportsParams = CommonParams & {
  category_id?: string
}

export type Report = {
  id: string
  merchant_name: string
  description: string | null
  category: {
    id: string
    name: string
  } | null
  type: {
    id: number
    name: string
  }
  status: {
    id: number
    name: string
  }
  amount: number
  date: string
  created_at: string
  updated_at: string | null
}

export type ReportsFilter = {
  category_id: string | null
  date: Date
}

export type GetReportsResponse = CommonResponseList<Report>