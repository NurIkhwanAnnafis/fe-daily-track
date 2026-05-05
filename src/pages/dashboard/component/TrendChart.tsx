import { Card, Typography } from "antd"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import type React from "react"
import type { MonthlyTrend } from "../dashboard.type"
import { numberFormatter } from "../../../utils/number"

type Props = {
  data: MonthlyTrend[]
}

const formatYAxis = (value: number) => {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`
  return `${value}`
}

const TrendChart: React.FC<Props> = ({ data }) => {
  return (
    <Card
      variant="outlined"
      className="rounded-xl!"
      title={
        <Typography.Text strong>Income vs Expense (Last 6 Months)</Typography.Text>
      }
    >
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={formatYAxis} tick={{ fontSize: 12 }} width={50} />
          <Tooltip
            formatter={(value) => typeof value === 'number' ? numberFormatter(value, 'id') : String(value)}
          />
          <Legend />
          <Bar dataKey="income" name="Income" fill="#16a34a" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expense" name="Expense" fill="#dc2626" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default TrendChart
