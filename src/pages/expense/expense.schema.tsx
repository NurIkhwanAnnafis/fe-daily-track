import type { FilterSchema } from "../../components/Filter/filter.type";
import type { CommonOptions } from "../../types/common";

type SchemaFilterProps = {
  categories: CommonOptions
}

export const schemaFilter = (props: SchemaFilterProps): FilterSchema[] => [
  {
    type: 'text',
    id: 'search',
    label: 'Transaction No',
    name: 'search',
    placeholder: 'Search by transaction no',
  },
  {
    type: 'select',
    id: 'category_id',
    label: 'Category',
    name: 'category_id',
    placeholder: 'Select category',
    options: props.categories,
  },
  {
    type: 'date',
    id: 'transaction_date',
    label: 'Transaction Date',
    name: 'date',
    placeholder: 'Select date',
  },
]
