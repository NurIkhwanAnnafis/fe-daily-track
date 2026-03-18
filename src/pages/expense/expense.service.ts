import { type Effect } from 'effect'
import http, { type HttpError } from '../../lib/http'
import type { GetExpensesParams, GetExpensesResponse } from './expense.type'
import type { HttpClient } from '@effect/platform'

export const getExpenses = (
  params: GetExpensesParams
): Effect.Effect<GetExpensesResponse, HttpError, HttpClient.HttpClient> =>
  http.get('/transactions', { params })