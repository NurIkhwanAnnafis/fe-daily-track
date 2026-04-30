import type { CategoryType } from "../../types/category-type"
import type { CommonResponse, CommonResponseList } from "../../types/common"

export type Category = {
  id: string
  name: string
  category_types: string[]
  logo?: string
  color?: string
  created_at: string
  updated_at: string
}

export type CategoryDetail = {
  id: string
  name: string
  created_at: string
  updated_at: string | null
  deleted_at: string | null
  organization: {
    id: string
    name: string
  }
  category_types: Array<{
    category_id: string
    type_id: number
    category_type: {
      id: number
      name: string
    }
  }>
}

export type CategoryFilter = {
  name: string
}

export type GetCategoryTypeResponse = CommonResponseList<CategoryType>

export type GetCategoryByIdResponse = CategoryDetail

export type CreateCategoryResponse = CommonResponse<Category>

export type CategoryFieldType = {
  name: string
  type_ids: number[]
}