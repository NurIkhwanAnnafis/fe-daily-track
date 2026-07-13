import { Form, InputNumber } from "antd"
import ModalForm from "../../../components/Form/ModalForm"
import { forwardRef, useImperativeHandle } from "react"
import type { UserConfigFieldType } from "../profilte.type"
import { useFormUserConfig } from "../hooks/useFormUserConfig"
import type { UserConfig } from "../../../types/user-config"

type Props = {
  onSuccess: () => void | Promise<unknown>
}

export type FormUserConfigRef = {
  handleUpdate: (userConfig?: UserConfig) => void
  handleCloseModal: () => void
}

const FormUserConfig = forwardRef<FormUserConfigRef, Props>((props, ref) => {
  const {
    onSuccess,
  } = props

  const {
    modal,
    form,
    onSubmit,
    handleUpdate,
    handleCloseModal,
  } = useFormUserConfig({ onSuccess })

  useImperativeHandle(ref, () => ({
    handleUpdate,
    handleCloseModal,
  }))

  return (
    <ModalForm<UserConfigFieldType>
      form={form}
      modal={modal}
      title="User Config"
      onCancel={handleCloseModal}
      onSubmit={onSubmit}
      name="form-user-config"
    >
      <Form.Item<UserConfigFieldType>
        label="Initial Amount"
        name="initial_amount"
        rules={[{ required: true, message: 'Please input initial amount!' }]}
        className="w-full mb-4!"
        required
      >
        <InputNumber placeholder="Input initial amount" styles={{ root: { width: '100%' } }} />
      </Form.Item>

      <Form.Item<UserConfigFieldType>
        label="Expense Limit Per Day"
        name="expense_limit_per_day"
        rules={[{ required: true, message: 'Please input expense limit per day!' }]}
        className="w-full mb-4!"
        required
      >
        <InputNumber placeholder="Input expense limit per day" styles={{ root: { width: '100%' } }} />
      </Form.Item>

      <Form.Item<UserConfigFieldType>
        label="Expense Limit Per Month"
        name="expense_limit_per_month"
        rules={[{ required: true, message: 'Please input expense limit per month!' }]}
        className="w-full mb-4!"
        required
      >
        <InputNumber placeholder="Input expense limit per day" styles={{ root: { width: '100%' } }} />
      </Form.Item>

      <Form.Item<UserConfigFieldType>
        label="Income Limit Per Day"
        name="income_limit_per_day"
        rules={[{ required: true, message: 'Please input income limit per day!' }]}
        className="w-full mb-4!"
        required
      >
        <InputNumber placeholder="Input income limit per day" styles={{ root: { width: '100%' } }} />
      </Form.Item>

      <Form.Item<UserConfigFieldType>
        label="Income Limit Per Month"
        name="income_limit_per_month"
        rules={[{ required: true, message: 'Please input income limit per month!' }]}
        className="w-full mb-4!"
        required
      >
        <InputNumber placeholder="Input income limit per day" styles={{ root: { width: '100%' } }} />
      </Form.Item>
    </ModalForm>
  )
})

export default FormUserConfig

