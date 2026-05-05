import type { Effect } from "effect"
import type { HttpClient } from "@effect/platform"
import http, { type HttpError } from "../../lib/http"
import type { GetDashboardSummaryResponse, GetRecentTransactionsResponse } from "./dashboard.type"

type DateRangeParams = {
  page: string
  limit: string
  start_date?: string
  end_date?: string
}

export const getDashboardSummary = (
  params: DateRangeParams
): Effect.Effect<GetDashboardSummaryResponse, HttpError, HttpClient.HttpClient> =>
  http.get('/transactions/summary', { params })

export const getRecentTransactions = (
  params: DateRangeParams
): Effect.Effect<GetRecentTransactionsResponse, HttpError, HttpClient.HttpClient> =>
  http.get('/transactions', { params })

