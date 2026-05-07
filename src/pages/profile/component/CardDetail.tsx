import type { ReactNode } from "react"
import { Button, Card } from "antd"
import { EditOutlined } from "@ant-design/icons"
import InfoRow from "./InfoRow"
import { cx } from "../../../utils/cx"

type Props = {
  title: string
  iconTitle: ReactNode
  data: Array<{
    label: string
    value: ReactNode
    icon?: ReactNode
  }>
  onEdit?: () => void
}

const CardDetail: React.FC<Props> = (props) => {
  const {
    title,
    iconTitle,
    data,
    onEdit,
  } = props

  return (
    <Card
      title={(
        <div
          className={cx("flex items-center", {
            "justify-between": !!onEdit,
          })}
        >
          <div className="flex items-center gap-3">
            {iconTitle}
            <span>{title}</span>
          </div>
          {onEdit && (
            <Button onClick={onEdit} type="text">
              <EditOutlined />
            </Button>
          )}
        </div>
      )}
    >
      {data.map((item, index) => (
        <InfoRow key={index} icon={item.icon} label={item.label} value={item.value} />
      ))}
    </Card>
  )
}

export default CardDetail
