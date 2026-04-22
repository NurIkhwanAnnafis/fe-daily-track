import dayjs from "dayjs"
import type { ColumnsType } from "antd/es/table"
import type { Income } from "./income.type"
import ColumnAction from "../../components/DataTable/ColumnAction"
import { numberFormatter } from "../../utils/number"

type Props = {
  handleEdit: (record: Income) => void
  handleDelete: (record: Income) => void
}

export const createColumns = ({ handleEdit, handleDelete }: Props): ColumnsType<Income> => [
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
    render: (_, record) => numberFormatter(record.amount, 'id-ID'),
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
        titleDelete="Delete the Income"
        descriptionDelete={`Are you sure to delete this income?`}
      />
    ),
  },
]