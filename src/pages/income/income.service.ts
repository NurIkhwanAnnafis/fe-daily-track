import { type Effect } from 'effect'
import http, { type HttpError } from '../../lib/http'
import type {
  CreateIncomesResponse,
  DeleteIncomesResponse,
  GetIncomesDetailResponse,
  GetIncomesParams,
  GetIncomesResponse,
  IncomeFieldType,
  UpdateIncomesResponse
} from './income.type'
import type { HttpClient } from '@effect/platform'

export const getIncomes = (
  params: GetIncomesParams
): Effect.Effect<GetIncomesResponse, HttpError, HttpClient.HttpClient> =>
  http.get('/incomes', { params })

export const createIncome = (
  data: IncomeFieldType
): Effect.Effect<CreateIncomesResponse, HttpError, HttpClient.HttpClient> =>
  http.post('/incomes', data)

export const updateIncome = (
  id: string,
  data: IncomeFieldType
): Effect.Effect<UpdateIncomesResponse, HttpError, HttpClient.HttpClient> =>
  http.put(`/incomes/${id}`, data)

export const getIncomeDetail = (
  id: string
): Effect.Effect<GetIncomesDetailResponse, HttpError, HttpClient.HttpClient> =>
  http.get(`/incomes/${id}`)

export const deleteIncome = (
  id: string
): Effect.Effect<DeleteIncomesResponse, HttpError, HttpClient.HttpClient> =>
  http.delete(`/incomes/${id}`)