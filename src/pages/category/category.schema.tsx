import type { FilterSchema } from "../../components/Filter/filter.type";
import type { CommonOptions } from "../../types/common";

type SchemaFilterProps = {
  options: CommonOptions
}

export const schemaFilter = (props: SchemaFilterProps): FilterSchema[] => [
  {
    type: 'text',
    id: 'name',
    label: 'Category Name',
    name: 'name',
    placeholder: 'Input category name',
  },
  {
    type: 'select',
    id: 'type_id',
    label: 'Category Type',
    name: 'type_id',
    placeholder: 'Select category type',
    options: props.options
  },
]