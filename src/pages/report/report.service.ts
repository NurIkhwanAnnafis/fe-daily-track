import type { Effect } from "effect"
import http from "../../lib/http"
import type { HttpClient } from "@effect/platform"
import type { HttpError } from "../../lib/http"
import type { GetReportsParams, GetReportsResponse } from "./report.type"

export const getReports = (
  params: GetReportsParams
): Effect.Effect<GetReportsResponse, HttpError, HttpClient.HttpClient> =>
  http.get('/transactions', { params })