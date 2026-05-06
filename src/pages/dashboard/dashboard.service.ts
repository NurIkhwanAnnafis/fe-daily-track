import type { Effect } from "effect"
import type { HttpClient } from "@effect/platform"
import http, { type HttpError } from "../../lib/http"
import type {
  GetDashboardSummaryParams,
  GetDashboardSummaryResponse,
  GetDashboardParams,
  GetTrendTransactionsLastSixMonthResponse,
  GetTransactionExpenseResponse,
  GetTransactionIncomeResponse,
  GetRecentTransactionsResponse,
  GetRecentTransactionsParams,
} from "./dashboard.type"

export const getDashboardSummary = (
  params: GetDashboardSummaryParams
): Effect.Effect<GetDashboardSummaryResponse, HttpError, HttpClient.HttpClient> =>
  http.get('/transactions/summary', { params })

export const getTrendTransactionsLastSixMonth = (
  params: GetDashboardParams
): Effect.Effect<GetTrendTransactionsLastSixMonthResponse, HttpError, HttpClient.HttpClient> =>
  http.get('/dashboard/transaction-trend-six-last-month', { params })

export const getTransactionExpense = (
  params: GetDashboardParams
): Effect.Effect<GetTransactionExpenseResponse, HttpError, HttpClient.HttpClient> =>
  http.get('/dashboard/transaction-expense', { params })

export const getTransactionIncome = (
  params: GetDashboardParams
): Effect.Effect<GetTransactionIncomeResponse, HttpError, HttpClient.HttpClient> =>
  http.get('/dashboard/transaction-income', { params })

export const getRecentTransactions = (
  params: GetRecentTransactionsParams
): Effect.Effect<GetRecentTransactionsResponse, HttpError, HttpClient.HttpClient> =>
  http.get('/transactions', { params })