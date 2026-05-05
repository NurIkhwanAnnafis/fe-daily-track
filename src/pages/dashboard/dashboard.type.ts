import type { CommonResponse, CommonResponseList } from "../../types/common"
import type { Report, Summary } from "../report/report.type"

export type MonthlyTrend = {
  month: string
  income: number
  expense: number
}

export type CategoryBreakdown = {
  category: string
  total: number
}

export type DashboardSummary = Summary

export type GetDashboardSummaryResponse = CommonResponse<Summary>
export type GetRecentTransactionsResponse = CommonResponseList<Report>
