import { Button, Space } from "antd"

type Props<T> = {
  handleEdit: (record: T) => void
  handleDelete: (record: T) => void
  record: T
}

const ColumnAction = <T,>({ handleEdit, handleDelete, record }: Props<T>) => {
  return (
    <Space>
      <Button
        htmlType="button"
        variant="outlined"
        onClick={() => handleEdit(record)}
      >
        Edit
      </Button>
      <Button
        htmlType="button"
        variant="outlined"
        color="red"
        onClick={() => handleDelete(record)}
      >
        Delete
      </Button>
    </Space>
  )
}

export default ColumnAction