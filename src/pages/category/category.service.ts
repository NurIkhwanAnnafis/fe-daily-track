import type { Effect } from "effect";
import type { CategoryFieldType, CreateCategoryResponse, GetCategoriesResponse, GetCategoryTypeResponse } from "./category.type";
import type { HttpError } from "../../lib/http";
import type { HttpClient } from "@effect/platform";
import http from "../../lib/http";
import type { CommonParams } from "../../types/common";

export const getCategories = (
  params: CommonParams
): Effect.Effect<GetCategoriesResponse, HttpError, HttpClient.HttpClient> =>
  http.get('/categories', { params })

export const getCategoryType = (
  params: CommonParams
): Effect.Effect<GetCategoryTypeResponse, HttpError, HttpClient.HttpClient> =>
  http.get('/category-types', { params })

export const createCategory = (
  data: CategoryFieldType
): Effect.Effect<CreateCategoryResponse, HttpError, HttpClient.HttpClient> =>
  http.post('/categories', data)

export const updateCategory = (
  data: CategoryFieldType,
  id: string
): Effect.Effect<CreateCategoryResponse, HttpError, HttpClient.HttpClient> =>
  http.put(`/categories/${id}`, data)