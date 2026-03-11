import type { CommonOptions } from "../../types/common"

export type Option = {
  text: string
  value: string
}

export type FilterSchema = FilterInputSchema | FilterDateSchema | FilterSelectSchema

export type UseFilter = FilterSchema[]

export type FilterFieldSchema = {
  id: string
  label: string
  name: string
  classname?: string
  placeholder?: string
  disabled?: boolean
  defaultValue?: { text: string; value: string }
}

export type FilterInputSchema = FilterFieldSchema & {
  type: "text"
}

export type FilterDateSchema = FilterFieldSchema & {
  type: "date"
}

export type FilterSelectSchema = FilterFieldSchema & {
  type: "select"
  options: CommonOptions
}
