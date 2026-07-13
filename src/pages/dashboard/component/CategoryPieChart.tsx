import { Card, Empty, Typography, theme } from "antd"
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Sector,
} from "recharts"
import type React from "react"
import type { CategoryBreakdown } from "../dashboard.type"
import { numberFormatter } from "../../../utils/number"
import { CATEGORICAL_PALETTE } from "../../../constants/chartColors"
import { useThemeMode } from "../../../store/useThemeMode.store"

type Props = {
  title: string
  description: string
  data: CategoryBreakdown[]
}

const CategoryPieChart: React.FC<Props> = ({ data, title, description }) => {
  const { mode } = useThemeMode()
  const colors = CATEGORICAL_PALETTE[mode]
  const {
    token: { colorBorderSecondary, colorBgElevated, colorText },
  } = theme.useToken()

  return (
    <Card
      variant="outlined"
      className="rounded-xl!"
      title={
        <Typography.Text strong>{title}</Typography.Text>
      }
    >
      {data.length === 0 ? (
        <div className="flex items-center justify-center h-[260px]">
          <Empty description={description} />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={data}
              dataKey="total"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              innerRadius={50}
              paddingAngle={5}
              label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
              labelLine={false}
              shape={(props) => <Sector {...props} fill={colors[props.index % colors.length]} />}
            />
            <Tooltip
              formatter={(value) => typeof value === 'number' ? numberFormatter(value, 'id') : String(value)}
              contentStyle={{ background: colorBgElevated, border: `1px solid ${colorBorderSecondary}`, borderRadius: 8, color: colorText }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </Card>
  )
}

export default CategoryPieChart
