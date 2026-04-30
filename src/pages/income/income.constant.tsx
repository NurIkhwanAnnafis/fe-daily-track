import dayjs from "dayjs"
import type { ColumnsType } from "antd/es/table"
import type { Income } from "./income.type"
import ColumnAction from "../../components/DataTable/ColumnAction"
import { numberFormatter } from "../../utils/number"
import { bigString } from "../../utils/string"
import { Tooltip } from "antd"

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
    key: "merchant_name"
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    responsive: ['md'],
    render: (_, record) => (
      <Tooltip title={record.description}>
        {bigString(record.description)}
      </Tooltip>
    ),
    width: 400,
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
      <ColumnAction<Income>
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        record={record}
        titleDelete="Delete the Income"
        descriptionDelete={`Are you sure to delete this income?`}
      />
    ),
    responsive: ['md']
  },
]