import type { Effect } from "effect";
import type { User as GetUserByIdResponse } from "../types/user";
import { HttpClient } from "@effect/platform";
import { type HttpError } from "../lib/http";
import http from "../lib/http";

export const getUserById = (
  id: string
): Effect.Effect<GetUserByIdResponse, HttpError, HttpClient.HttpClient> =>
  http.get(`/users/${id}`)