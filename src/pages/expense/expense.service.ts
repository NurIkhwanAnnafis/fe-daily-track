import { type Effect } from 'effect'
import http, { type HttpError } from '../../lib/http'
import type {
  CreateExpenseResponse,
  DeleteExpenseResponse,
  ExpenseFieldType,
  GetExpenseDetailResponse,
  GetExpensesParams,
  GetExpensesResponse,
  UpdateExpenseResponse
} from './expense.type'
import type { HttpClient } from '@effect/platform'

export const getExpenses = (
  params: GetExpensesParams
): Effect.Effect<GetExpensesResponse, HttpError, HttpClient.HttpClient> =>
  http.get('/expenses', { params })

export const createExpense = (
  data: ExpenseFieldType
): Effect.Effect<CreateExpenseResponse, HttpError, HttpClient.HttpClient> =>
  http.post('/expenses', data)

export const updateExpense = (
  id: string,
  data: ExpenseFieldType
): Effect.Effect<UpdateExpenseResponse, HttpError, HttpClient.HttpClient> =>
  http.put(`/expenses/${id}`, data)

export const getExpenseDetail = (
  id: string
): Effect.Effect<GetExpenseDetailResponse, HttpError, HttpClient.HttpClient> =>
  http.get(`/expenses/${id}`)

export const deleteExpense = (
  id: string
): Effect.Effect<DeleteExpenseResponse, HttpError, HttpClient.HttpClient> =>
  http.delete(`/expenses/${id}`)