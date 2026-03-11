import type { ColumnsType } from "antd/es/table"
import type { Category } from "./category.type"
import ColumnAction from "../../components/DataTable/ColumnAction"

type Props = {
  handleEdit: (record: Category) => void
  handleDelete: (record: Category) => void
}

export const createColumns = ({ handleEdit, handleDelete }: Props): ColumnsType<Category> => [
  {
    title: "No",
    dataIndex: "no",
    key: "no",
    render: (_, record, index) => index + 1,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: (_, record) => (
      <ColumnAction<Category>
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        record={record}
      />
    ),
  },
]