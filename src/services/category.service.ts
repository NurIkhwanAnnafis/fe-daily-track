import type { Effect } from "effect";
import type { HttpClient } from "@effect/platform";
import http from "../lib/http";
import type { HttpError } from "../lib/http";
import type { GetCategoriesResponse, GetCategoryParams } from "../types/category";

export const getCategories = (
  params: GetCategoryParams
): Effect.Effect<GetCategoriesResponse, HttpError, HttpClient.HttpClient> =>
  http.get('/categories', { params })