import { Effect } from 'effect'
import { HttpClient } from '@effect/platform'
import http, { type HttpError } from '../../lib/http'
import type { LoginPayload, LoginResponse } from './login.type'

/**
 * POST /auth/login
 * Returns an Effect that yields LoginResponse or fails with HttpError.
 * Provide FetchHttpClient.layer via the app runtime (see runtime.ts).
 */
export const postLogin = (
  payload: LoginPayload,
): Effect.Effect<LoginResponse, HttpError, HttpClient.HttpClient> =>
  http.post<LoginResponse>('/auth/login', payload, { cleanBody: true })