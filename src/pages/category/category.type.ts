import type { CategoryType } from "../../types/category-type"
import type { CommonResponse, CommonResponseList } from "../../types/common"

export type Category = {
  id: string
  name: string
  description: string
  type: {
    id: number
    name: string
  }
  created_at: string
  updated_at: string
}

export type CategoryFilter = {
  name: string
}

export type GetCategoriesResponse = CommonResponseList<Category>

export type GetCategoryTypeResponse = CommonResponseList<CategoryType>

export type CreateCategoryResponse = CommonResponse<Category>

export type CategoryFieldType = {
  name: string
  type_id: number
}