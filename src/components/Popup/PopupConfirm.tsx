import { Popconfirm } from "antd"

type Props = {
  title: string
  description: string
  onConfirm: () => void
  onCancel?: () => void
  okText: string
  cancelText: string
  children: React.ReactNode
}

const PopupConfirm: React.FC<Props> = (props) => {
  const { title, description, onConfirm, onCancel, okText, cancelText, children } = props

  return (
    <Popconfirm
      title={title}
      description={description}
      onConfirm={onConfirm}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
    >
      {children}
    </Popconfirm>
  )
}

export default PopupConfirm
