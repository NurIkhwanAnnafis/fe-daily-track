import type { HttpError } from "../lib/http"

export const getErrorMessage = (error: HttpError) => {
  if (error._tag === 'HttpResponseError') {
    return error.error.message
  }
  return 'A network error occurred. Please try again.'
}