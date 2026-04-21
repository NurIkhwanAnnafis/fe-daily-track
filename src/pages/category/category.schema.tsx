import type { FilterSchema } from "../../components/Filter/filter.type";
import type { CommonOptions } from "../../types/common";

type SchemaFilterProps = {
  options: CommonOptions
}

export const schemaFilter = (props: SchemaFilterProps): FilterSchema[] => [
  {
    type: 'text',
    id: 'search',
    label: 'Category Name',
    name: 'search',
    placeholder: 'Input category name',
  },
  {
    type: 'select',
    id: 'type_id',
    label: 'Category Type',
    name: 'type_ids',
    placeholder: 'Select category type',
    options: props.options,
    multiple: true
  },
]