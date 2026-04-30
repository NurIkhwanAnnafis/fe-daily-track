import type { Effect } from "effect";
import type { CategoryFieldType, CreateCategoryResponse, GetCategoryByIdResponse, GetCategoryTypeResponse } from "./category.type";
import type { HttpError } from "../../lib/http";
import type { HttpClient } from "@effect/platform";
import http from "../../lib/http";
import type { CommonParams } from "../../types/common";

export const getCategoryType = (
  params: CommonParams
): Effect.Effect<GetCategoryTypeResponse, HttpError, HttpClient.HttpClient> =>
  http.get('/category-types', { params })

export const getCategoryById = (
  id: string
): Effect.Effect<GetCategoryByIdResponse, HttpError, HttpClient.HttpClient> =>
  http.get(`/categories/${id}`)

export const createCategory = (
  data: CategoryFieldType
): Effect.Effect<CreateCategoryResponse, HttpError, HttpClient.HttpClient> =>
  http.post('/categories', data)

export const updateCategory = (
  data: CategoryFieldType,
  id: string
): Effect.Effect<CreateCategoryResponse, HttpError, HttpClient.HttpClient> =>
  http.put(`/categories/${id}`, data)

export const deleteCategory = (
  id: string
): Effect.Effect<{ id: string }, HttpError, HttpClient.HttpClient> =>
  http.delete(`/categories/${id}`)