import { Button, Typography } from "antd"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"
import type { Dayjs } from "dayjs"
import type React from "react"

type Props = {
  selectedMonth: Dayjs
  onPrev: () => void
  onNext: () => void
}

const MonthNavigator: React.FC<Props> = ({ selectedMonth, onPrev, onNext }) => {
  return (
    <div className="flex items-center gap-3">
      <Button
        shape="circle"
        icon={<LeftOutlined />}
        onClick={onPrev}
        size="small"
      />
      <Typography.Text strong className="text-base min-w-[90px] text-center">
        {selectedMonth.format('MMM YYYY')}
      </Typography.Text>
      <Button
        shape="circle"
        icon={<RightOutlined />}
        onClick={onNext}
        size="small"
        disabled={selectedMonth.isSame(new Date(), 'month')}
      />
    </div>
  )
}

export default MonthNavigator
