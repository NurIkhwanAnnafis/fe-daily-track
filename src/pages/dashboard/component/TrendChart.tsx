import { Card, Typography, theme } from "antd"
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
  const {
    token: { colorSuccess, colorError, colorBorderSecondary, colorTextTertiary, colorBgElevated, colorText },
  } = theme.useToken()

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
          <CartesianGrid strokeDasharray="3 3" stroke={colorBorderSecondary} />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: colorTextTertiary }} />
          <YAxis tickFormatter={formatYAxis} tick={{ fontSize: 12, fill: colorTextTertiary }} width={50} />
          <Tooltip
            formatter={(value) => typeof value === 'number' ? numberFormatter(value, 'id') : String(value)}
            contentStyle={{ background: colorBgElevated, border: `1px solid ${colorBorderSecondary}`, borderRadius: 8, color: colorText }}
          />
          <Legend />
          <Bar dataKey="income" name="Income" fill={colorSuccess} radius={[4, 4, 0, 0]} />
          <Bar dataKey="expense" name="Expense" fill={colorError} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default TrendChart
