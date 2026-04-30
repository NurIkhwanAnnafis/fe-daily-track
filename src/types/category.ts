import type { CommonParams, CommonResponseList } from "./common"

export type Category = {
  id: string
  name: string
  category_types: string[]
  logo?: string
  color?: string
  created_at: string
  updated_at: string
}

export type GetCategoryParams = CommonParams & {
  type_ids?: number
}

export type GetCategoriesResponse = CommonResponseList<Category>