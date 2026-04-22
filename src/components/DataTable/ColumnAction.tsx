import { Button, Space } from "antd"
import PopupConfirm from "../Popup/PopupConfirm"

type Props<T> = {
  handleEdit: (record: T) => void
  handleDelete: (record: T) => void
  record: T
  titleDelete?: string
  descriptionDelete?: string
}

const ColumnAction = <T,>(props: Props<T>) => {
  const {
    handleEdit,
    handleDelete,
    record,
    titleDelete = 'Delete',
    descriptionDelete = 'Are you sure to delete this item?',
  } = props

  return (
    <Space>
      <Button
        htmlType="button"
        variant="outlined"
        onClick={() => handleEdit(record)}
      >
        Edit
      </Button>
      <PopupConfirm
        title={titleDelete}
        description={descriptionDelete}
        onConfirm={() => handleDelete(record)}
        okText="Yes"
        cancelText="No"
      >
        <Button
          htmlType="button"
          variant="outlined"
          color="red"
        >
          Delete
        </Button>
      </PopupConfirm>
    </Space>
  )
}

export default ColumnAction