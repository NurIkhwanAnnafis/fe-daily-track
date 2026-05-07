import type { HttpClient } from '@effect/platform'
import type { HttpError } from '../lib/http'
import { type UserConfig as GetUserConfigResponse } from '../types/user-config'
import type { Effect } from 'effect'
import http from '../lib/http'
import type {
  CreateUserConfigByIdResponse,
  CreateUserConfigFieldType,
  UpdateUserConfigByIdResponse,
  UpdateUserConfigFieldType
} from '../types/user-config'

export const getUserConfig = (): Effect.Effect<GetUserConfigResponse, HttpError, HttpClient.HttpClient> =>
  http.get('/config-user')

export const createUserConfig = (
  data: CreateUserConfigFieldType
): Effect.Effect<CreateUserConfigByIdResponse, HttpError, HttpClient.HttpClient> =>
  http.post('/config-user', data)

export const updateUserConfig = (
  data: UpdateUserConfigFieldType
): Effect.Effect<UpdateUserConfigByIdResponse, HttpError, HttpClient.HttpClient> =>
  http.put('/config-user', data)
