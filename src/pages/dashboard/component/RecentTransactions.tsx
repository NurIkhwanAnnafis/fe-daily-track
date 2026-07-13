import { Card, Table, Tag, Typography, Button } from "antd"
import { ArrowRightOutlined } from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"
import { useNavigate } from "@tanstack/react-router"
import dayjs from "dayjs"
import type React from "react"
import type { Report } from "../../report/report.type"
import { numberFormatter } from "../../../utils/number"
import { TRANSACTION_TYPE } from "../../../constants/transaction"

type Props = {
  data: Report[]
  date: string
}

const columns: ColumnsType<Report> = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (_, record) => dayjs(record.date).format('DD MMM YYYY'),
  },
  {
    title: 'Merchant',
    dataIndex: 'merchant_name',
    key: 'merchant_name',
    ellipsis: true,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: (_, record) => (
      <Tag color={record.type?.id === TRANSACTION_TYPE.INCOME ? 'success' : 'error'}>
        {record.type?.name}
      </Tag>
    ),
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    align: 'right',
    render: (_, record) => (
      <Typography.Text
        type={record.type?.id === TRANSACTION_TYPE.INCOME ? 'success' : 'danger'}
        className="font-tabular"
      >
        {record.type?.id === TRANSACTION_TYPE.INCOME ? '+' : '-'}
        {numberFormatter(record.amount, 'id')}
      </Typography.Text>
    ),
  },
]

const RecentTransactions: React.FC<Props> = ({ data, date }) => {
  const navigate = useNavigate()

  return (
    <Card
      variant="outlined"
      className="rounded-xl!"
      title={<Typography.Text strong>Recent Transactions - {date}</Typography.Text>}
      extra={
        <Button
          type="link"
          size="small"
          icon={<ArrowRightOutlined />}
          iconPosition="end"
          onClick={() => navigate({ to: '/report' })}
        >
          See all
        </Button>
      }
    >
      <Table<Report>
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={false}
        size="small"
        locale={{ emptyText: 'No recent transactions' }}
      />
    </Card>
  )
}

export default RecentTransactions
