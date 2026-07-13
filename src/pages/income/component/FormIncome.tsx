import { DatePicker, Form, Input, InputNumber, Select } from "antd"
import ModalForm from "../../../components/Form/ModalForm"
import type { CommonOptions } from "../../../types/common"
import { forwardRef, useImperativeHandle } from "react"
import type { IncomeFieldType } from "../income.type"
import { useFormIncome } from "../hooks/useFormIncome"

type Props = {
  onSuccess: () => void | Promise<unknown>
  categories: CommonOptions
}

export type FormIncomeRef = {
  fetchDetail: (id: string) => Promise<void>
  handleCreate: () => void
  handleCloseModal: () => void
}

const FormIncome = forwardRef<FormIncomeRef, Props>((props, ref) => {
  const {
    onSuccess,
    categories,
  } = props

  const {
    modal,
    form,
    onSubmit,
    handleCreate,
    fetchDetail,
    handleCloseModal,
  } = useFormIncome({ onSuccess })

  useImperativeHandle(ref, () => ({
    fetchDetail,
    handleCreate,
    handleCloseModal,
  }))

  return (
    <ModalForm<IncomeFieldType>
      form={form}
      modal={modal}
      title="Income"
      onCancel={handleCloseModal}
      onSubmit={onSubmit}
      name="form-income"
    >
      <Form.Item<IncomeFieldType>
        label="Merchant Name"
        name="merchant_name"
        rules={[{ required: true, message: 'Please input merchant name!' }]}
        className="w-full mb-4!"
        required
      >
        <Input placeholder="Input merchant name" className="w-full" />
      </Form.Item>

      <Form.Item<IncomeFieldType>
        label="Amount"
        name="amount"
        rules={[{ required: true, message: 'Please input amount!' }]}
        className="w-full mb-4!"
        required
      >
        <InputNumber placeholder="Input amount" styles={{ root: { width: '100%' } }} />
      </Form.Item>

      <Form.Item<IncomeFieldType>
        label="Date"
        name="date"
        rules={[{ required: true, message: 'Please input date!' }]}
        className="w-full mb-4!"
        required
      >
        <DatePicker showTime placeholder="Input Date" className="w-full" />
      </Form.Item>

      <Form.Item<IncomeFieldType>
        label="Category"
        name="category_id"
        rules={[{ required: true, message: 'Please select category!' }]}
        className="w-full mb-4!"
        required
      >
        <Select options={categories} placeholder="Select category" allowClear className="w-full" />
      </Form.Item>

      <Form.Item<IncomeFieldType>
        label="Description"
        name="description"
        className="w-full mb-4!"
      >
        <Input.TextArea rows={4} placeholder="Input description" />
      </Form.Item>
    </ModalForm>
  )
})

export default FormIncome
