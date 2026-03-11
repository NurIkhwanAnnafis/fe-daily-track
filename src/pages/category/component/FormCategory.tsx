import { Form, Input, Select } from "antd"
import ModalForm from "../../../components/Form/ModalForm"
import type { Category, CategoryFieldType } from "../category.type"
import type { CommonOptions } from "../../../types/common"
import { useFormCategory } from "../hooks/useFormCategory"

type Props = {
  modal: {
    open: boolean
    type: 'create' | 'edit'
    data?: Category
  }
  closeModal: () => void
  onSuccess: () => void
  categoryTypes: CommonOptions
}

const FormCategory: React.FC<Props> = (props) => {
  const {
    modal,
    closeModal,
    onSuccess,
    categoryTypes,
  } = props

  const {
    onSubmit,
  } = useFormCategory({ onSuccess })

  return (
    <ModalForm<CategoryFieldType>
      modal={modal}
      title="Category"
      onCancel={closeModal}
      onSubmit={onSubmit}
    >
      <Form.Item<CategoryFieldType>
        label="Category Name"
        name="name"
        rules={[{ required: true, message: 'Please input category name!' }]}
        className="w-full mb-4! text-neutral-950"
        required
      >
        <Input placeholder="Input category name" />
      </Form.Item>

      <Form.Item<CategoryFieldType>
        label="Category Type"
        name="type_id"
        rules={[{ required: true, message: 'Please select category type!' }]}
        className="w-full mb-4! text-neutral-950"
        required
      >
        <Select options={categoryTypes} placeholder="Select category type" allowClear />
      </Form.Item>
    </ModalForm>
  )
}

export default FormCategory
