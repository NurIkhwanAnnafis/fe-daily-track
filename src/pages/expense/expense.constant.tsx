import dayjs from "dayjs"
import type { ColumnsType } from "antd/es/table"
import type { Expense } from "./expense.type"
import ColumnAction from "../../components/DataTable/ColumnAction"
import { numberFormatter } from "../../utils/number"

type Props = {
  handleEdit: (record: Expense) => void
  handleDelete: (record: Expense) => void
}

export const createColumns = ({ handleEdit, handleDelete }: Props): ColumnsType<Expense> => [
  {
    title: "Transaction Date",
    dataIndex: "date",
    key: "date",
    render: (_, record) => dayjs(record.date).format('DD MMM YYYY HH:mm:ss'),
  },
  {
    title: "Merchant Name",
    dataIndex: "merchant_name",
    key: "merchant_name",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    responsive: ['md']
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: (_, record) => record.category?.name,
    responsive: ['md']
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (_, record) => numberFormatter(record.amount, 'id-ID'),
    responsive: ['md']
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: (_, record) => (
      <ColumnAction<Expense>
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        record={record}
        titleDelete="Delete the Expense"
        descriptionDelete={`Are you sure to delete this expense?`}
      />
    ),
    responsive: ['md']
  },
]