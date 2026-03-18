import { type Effect } from 'effect'
import http, { type HttpError } from '../../lib/http'
import type { GetIncomesParams, GetIncomesResponse } from './income.type'
import type { HttpClient } from '@effect/platform'

export const getIncomes = (
  params: GetIncomesParams
): Effect.Effect<GetIncomesResponse, HttpError, HttpClient.HttpClient> =>
  http.get('/transactions', { params })