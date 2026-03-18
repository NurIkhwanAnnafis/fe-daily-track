import type { ColumnsType } from "antd/es/table"
import type { Income } from "./income.type"
import ColumnAction from "../../components/DataTable/ColumnAction"

type Props = {
  handleEdit: (record: Income) => void
  handleDelete: (record: Income) => void
}

export const createColumns = ({ handleEdit, handleDelete }: Props): ColumnsType<Income> => [
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
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: (_, record) => record.category?.name,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Transaction Date",
    dataIndex: "transaction_date",
    key: "transaction_date",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: (_, record) => (
      <ColumnAction<Income>
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        record={record}
      />
    ),
  },
]