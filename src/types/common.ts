export type CommonResponseList<T> = {
  data: Array<T>
  meta: {
    total: number
    page: number
    page_size: number
  }
}

export type CommonResponse<T> = {
  data: T
}

export type CommonParams = {
  page: string
  limit: string
  search?: string
}

export type CommonOptions = Array<{
  value: number
  label: string
}>