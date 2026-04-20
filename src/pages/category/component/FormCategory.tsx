import { Form, Input, Select } from "antd"
import ModalForm from "../../../components/Form/ModalForm"
import type { CategoryFieldType } from "../category.type"
import type { CommonOptions } from "../../../types/common"
import { useFormCategory } from "../hooks/useFormCategory"
import { forwardRef, useImperativeHandle } from "react"

type Props = {
  onSuccess: () => void | Promise<unknown>
  categoryTypes: CommonOptions
}

export type FormCategoryRef = {
  fetchDetail: (id: string) => Promise<void>
  handleCreate: () => void
  handleCloseModal: () => void
}

const FormCategory = forwardRef<FormCategoryRef, Props>((props, ref) => {
  const {
    onSuccess,
    categoryTypes,
  } = props

  const {
    modal,
    form,
    onSubmit,
    handleCreate,
    fetchDetail,
    handleCloseModal,
  } = useFormCategory({ onSuccess })

  useImperativeHandle(ref, () => ({
    fetchDetail,
    handleCreate,
    handleCloseModal,
  }))

  return (
    <ModalForm<CategoryFieldType>
      form={form}
      modal={modal}
      title="Category"
      onCancel={handleCloseModal}
      onSubmit={onSubmit}
      name="form-category"
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
        name="type_ids"
        rules={[{ required: true, message: 'Please select category type!' }]}
        className="w-full mb-4! text-neutral-950"
        required
      >
        <Select options={categoryTypes} placeholder="Select category type" allowClear mode="multiple" />
      </Form.Item>
    </ModalForm>
  )
})

export default FormCategory
