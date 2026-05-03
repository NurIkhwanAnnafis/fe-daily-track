import { Tag, Tooltip, Typography } from "antd"
import dayjs from "dayjs"
import type { ColumnsType } from "antd/es/table"
import type { Report } from "./report.type"
import { numberFormatter } from "../../utils/number"
import { bigString, capitalizeFirstLetter } from "../../utils/string"
import { TRANSACTION_TYPE } from "../../constants/transaction"

export const column: ColumnsType<Report> = [
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
    title: "Type",
    dataIndex: "type",
    key: "type",
    render: (_, record) => (
      <Tag color={record.type?.id === TRANSACTION_TYPE.INCOME ? 'green' : 'red'}>
        {capitalizeFirstLetter(record.type?.name)}
      </Tag>
    ),
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
    render: (_, record) => (
      <Typography.Text
        style={{
          color: record.type?.id === TRANSACTION_TYPE.INCOME ? 'green' : 'red',
        }}
      >
        {record.type?.id === TRANSACTION_TYPE.INCOME ? '+' : '-'}{numberFormatter(record.amount, 'id')}
      </Typography.Text>
    ),
    responsive: ['md']
  },
]