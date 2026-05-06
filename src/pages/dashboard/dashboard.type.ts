import type { CommonResponse, CommonResponseList } from "../../types/common"

type Report = {
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

export type MonthlyTrend = {
  month: string
  income: number
  expense: number
}

export type CategoryBreakdown = {
  category: string
  total: number
}

export type TrendTransactionsLastSixMonth = {
  month: string
  income: number
  expense: number
}

export type Summary = {
  income: number
  expense: number
  amount: number
  balance: number
}

export type GetDashboardSummaryParams = {
  page: string
  limit: string
  start_date?: string
  end_date?: string
}

export type GetDashboardParams = {
  date: string
}

export type GetRecentTransactionsParams = {
  page: number
  limit: number
  start_date?: string
  end_date?: string
}

export type TransactionCategory = {
  category: string
  total: number
}

export type GetTrendTransactionsLastSixMonthResponse = CommonResponse<TrendTransactionsLastSixMonth[]>
export type GetDashboardSummaryResponse = CommonResponse<Summary>
export type GetTransactionExpenseResponse = CommonResponse<TransactionCategory[]>
export type GetTransactionIncomeResponse = CommonResponse<TransactionCategory[]>
export type GetRecentTransactionsResponse = CommonResponseList<Report>
