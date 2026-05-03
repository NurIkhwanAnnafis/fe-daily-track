import type { HttpClient } from '@effect/platform'
import type { HttpError } from '../lib/http'
import { type UserConfig as GetUserConfigResponse } from '../types/user-config'
import type { Effect } from 'effect'
import http from '../lib/http'

export const getUserConfig = (): Effect.Effect<GetUserConfigResponse, HttpError, HttpClient.HttpClient> =>
  http.get('/config-user')
