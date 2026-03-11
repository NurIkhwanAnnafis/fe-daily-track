/**
 * HTTP service – built on @effect/platform's HttpClient.
 *
 * Usage
 * -----
 * 1.  Provide `FetchHttpClient.layer` to your runtime (see `runtime.ts`).
 * 2.  Call `httpGet / httpPost / httpPut / httpDelete` inside Effect.gen.
 *
 * Both functions require `HttpClient.HttpClient` in their environment,
 * which is satisfied by the layer in step 1.
 */

import {
  FetchHttpClient,
  HttpClient,
  HttpClientError,
  HttpClientRequest,
  HttpBody,
} from '@effect/platform'
import { Data, Effect } from 'effect'
import { cleanObject } from '../utils/object'
import { getUserLocalStorage, removeUserLocalStorage } from '../utils/localstorage'

// ---------------------------------------------------------------------------
// Public Layer re-export – add this to your runtime Layer
// ---------------------------------------------------------------------------

export { FetchHttpClient }

// ---------------------------------------------------------------------------
// Error types
// ---------------------------------------------------------------------------

/** A non-2xx HTTP response. */
export class HttpResponseError extends Data.TaggedError('HttpResponseError')<{
  readonly success: boolean
  readonly error: {
    readonly message: string
    readonly statusCode: number
  }
}> { }

/** A network / transport failure (DNS, connection refused, etc.). */
export class HttpNetworkError extends Data.TaggedError('HttpNetworkError')<{
  readonly cause: HttpClientError.HttpClientError
}> { }

export type HttpError = HttpResponseError | HttpNetworkError
type ApiErrorBody = { success: boolean; error: { message: string; statusCode: number } } | null

// ---------------------------------------------------------------------------
// Base URL
// ---------------------------------------------------------------------------

const BASE_URL: string = import.meta.env?.VITE_BASE_URL

// ---------------------------------------------------------------------------
// Internal executor
// ---------------------------------------------------------------------------

const executeJson = <T>(
  request: Effect.Effect<HttpClientRequest.HttpClientRequest, HttpBody.HttpBodyError, never>,
): Effect.Effect<T, HttpError, HttpClient.HttpClient> =>
  Effect.gen(function* () {
    const client = yield* HttpClient.HttpClient

    const resolvedRequest = yield* request.pipe(
      Effect.mapError(() => new HttpResponseError({ success: false, error: { message: 'Request body encoding failed', statusCode: 0 } })),
    )

    const response = yield* client.execute(resolvedRequest).pipe(
      Effect.mapError((cause) => new HttpNetworkError({ cause })),
    )

    if (response.status === 401) {
      removeUserLocalStorage()
      window.location.href = '/login'
      return yield* Effect.fail(
        new HttpResponseError({ success: false, error: { message: 'Unauthorized', statusCode: 401 } }),
      )
    }

    if (response.status < 200 || response.status >= 300) {
      const rawBody = yield* response.json.pipe(Effect.orElseSucceed(() => null))
      const body = rawBody as ApiErrorBody
      return yield* Effect.fail(
        new HttpResponseError({
          success: false,
          error: {
            message: body?.error?.message ?? 'Unknown error',
            statusCode: body?.error?.statusCode ?? response.status,
          },
        }),
      )
    }

    return (yield* response.json.pipe(
      Effect.mapError(
        () => new HttpResponseError({ success: false, error: { message: 'Failed to parse response', statusCode: response.status } }),
      ),
    )) as T
  })

// ---------------------------------------------------------------------------
// HTTP helpers
// ---------------------------------------------------------------------------

type HttpOptions = {
  headers?: Record<string, string>
  params?: Record<string, string>
  baseUrl?: string
  cleanBody?: boolean
  cleanParams?: boolean
}

const httpServices = <T>(
  path: string,
  body: unknown,
  options?: HttpOptions
): {
  get: () => Effect.Effect<T, HttpError, HttpClient.HttpClient>
  post: () => Effect.Effect<T, HttpError, HttpClient.HttpClient>
  put: () => Effect.Effect<T, HttpError, HttpClient.HttpClient>
  delete: () => Effect.Effect<T, HttpError, HttpClient.HttpClient>
} => {
  let url = `${options?.baseUrl ?? BASE_URL}${path}`
  if (options?.params) {
    const params = options.cleanParams ? cleanObject(options.params) : options.params

    url += '?' + new URLSearchParams(params).toString()
  }

  let currentBody = body
  if (options?.cleanBody && typeof body === 'object') {
    currentBody = cleanObject(body as Record<string, string>)
  }

  const methodGet = HttpClientRequest.get(url)
  const methodPost = HttpClientRequest.post(url).pipe(
    HttpClientRequest.setHeader('Content-Type', 'application/json'),
    HttpClientRequest.bodyJson(currentBody),
  )
  const methodPut = HttpClientRequest.put(url).pipe(
    HttpClientRequest.setHeader('Content-Type', 'application/json'),
    HttpClientRequest.bodyJson(currentBody),
  )
  const methodDelete = HttpClientRequest.del(url)

  // Lift a plain request or an effectful request into Effect, then optionally add headers
  const reqs = (
    httpClient:
      | HttpClientRequest.HttpClientRequest
      | Effect.Effect<HttpClientRequest.HttpClientRequest, HttpBody.HttpBodyError, never>,
  ): Effect.Effect<HttpClientRequest.HttpClientRequest, HttpBody.HttpBodyError, never> => {
    const asEffect: Effect.Effect<HttpClientRequest.HttpClientRequest, HttpBody.HttpBodyError, never> =
      Effect.isEffect(httpClient)
        ? (httpClient as Effect.Effect<HttpClientRequest.HttpClientRequest, HttpBody.HttpBodyError, never>)
        : Effect.succeed(httpClient as HttpClientRequest.HttpClientRequest)

    const token = getUserLocalStorage()?.token
    const mergedHeaders: Record<string, string> = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers ?? {}),
    }

    if (Object.keys(mergedHeaders).length > 0) {
      return asEffect.pipe(
        Effect.map((req) => HttpClientRequest.setHeaders(mergedHeaders)(req)),
      )
    }
    return asEffect
  }

  return {
    get: () => executeJson<T>(reqs(methodGet)),
    post: () => executeJson<T>(reqs(methodPost)),
    put: () => executeJson<T>(reqs(methodPut)),
    delete: () => executeJson<T>(reqs(methodDelete)),
  }
}

const http = {
  get: <T>(path: string, options?: HttpOptions) => httpServices<T>(path, {}, options).get(),
  post: <T>(path: string, body: unknown, options?: HttpOptions) => httpServices<T>(path, body, options).post(),
  put: <T>(path: string, body: unknown, options?: HttpOptions) => httpServices<T>(path, body, options).put(),
  delete: <T>(path: string, options?: HttpOptions) => httpServices<T>(path, {}, options).delete(),
}

export default http