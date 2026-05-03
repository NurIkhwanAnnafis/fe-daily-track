import type { ReactNode } from "react"
import { Card } from "antd"
import InfoRow from "./InfoRow"

type Props = {
  title: string
  iconTitle: ReactNode
  data: Array<{
    label: string
    value: ReactNode
    icon?: ReactNode
  }>
}

const CardDetail: React.FC<Props> = (props) => {
  const {
    title,
    iconTitle,
    data
  } = props

  return (
    <Card
      title={(
        <div className='flex items-center gap-3'>
          {iconTitle}
          <span>{title}</span>
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
