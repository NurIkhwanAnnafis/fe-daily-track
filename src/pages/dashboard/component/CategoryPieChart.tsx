import { Card, Empty, Typography } from "antd"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Sector,
} from "recharts"
import type React from "react"
import type { CategoryBreakdown } from "../dashboard.type"
import { numberFormatter } from "../../../utils/number"

type Props = {
  data: CategoryBreakdown[]
}

const COLORS = [
  '#6366f1', '#16a34a', '#dc2626', '#d97706',
  '#0891b2', '#7c3aed', '#db2777', '#059669',
]

const CategoryPieChart: React.FC<Props> = ({ data }) => {
  return (
    <Card
      variant="outlined"
      className="rounded-xl!"
      title={
        <Typography.Text strong>Expense by Category</Typography.Text>
      }
    >
      {data.length === 0 ? (
        <div className="flex items-center justify-center h-[260px]">
          <Empty description="No expense data for this month" />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={data}
              dataKey="total"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={90}
              innerRadius={50}
              paddingAngle={3}
              label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
              labelLine={false}
              shape={(props) => <Sector {...props} fill={COLORS[props.index % COLORS.length]} />}
            />
            <Tooltip
              formatter={(value) => typeof value === 'number' ? numberFormatter(value, 'id') : String(value)}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </Card>
  )
}

export default CategoryPieChart
