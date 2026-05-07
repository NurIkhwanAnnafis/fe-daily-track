import { Form, Input } from "antd"
import ModalForm from "../../../components/Form/ModalForm"
import { forwardRef, useImperativeHandle } from "react"
import type { AccountDetailsFieldType } from "../profilte.type"
import type { User } from "../../../types/user"
import { useFormAccountDetails } from "../hooks/useFormAccountDetails"

type Props = {
  onSuccess: () => void | Promise<unknown>
}

export type FormAccountDetailsRef = {
  handleUpdate: (user?: User) => void
  handleCloseModal: () => void
}

const FormAccountDetails = forwardRef<FormAccountDetailsRef, Props>((props, ref) => {
  const {
    onSuccess,
  } = props

  const {
    modal,
    form,
    onSubmit,
    handleUpdate,
    handleCloseModal,
  } = useFormAccountDetails({ onSuccess })

  useImperativeHandle(ref, () => ({
    handleUpdate,
    handleCloseModal,
  }))

  return (
    <ModalForm<AccountDetailsFieldType>
      form={form}
      modal={modal}
      title="Account Details"
      onCancel={handleCloseModal}
      onSubmit={onSubmit}
      name="form-account-details"
    >
      <Form.Item<AccountDetailsFieldType>
        label="First Name"
        name="first_name"
        rules={[{ required: true, message: 'Please input first name!' }]}
        className="w-full mb-4! text-neutral-950"
        required
      >
        <Input placeholder="Input first name" className="w-full" />
      </Form.Item>

      <Form.Item<AccountDetailsFieldType>
        label="Last Name"
        name="last_name"
        rules={[{ required: true, message: 'Please input last name!' }]}
        className="w-full mb-4! text-neutral-950"
        required
      >
        <Input placeholder="Input last name" className="w-full" />
      </Form.Item>

      <Form.Item<AccountDetailsFieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input email!', type: 'email' }]}
        className="w-full mb-4! text-neutral-950"
        required
      >
        <Input placeholder="Input email" className="w-full" />
      </Form.Item>

      <Form.Item<AccountDetailsFieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input password!' }]}
        className="w-full mb-4! text-neutral-950"
        required
        hasFeedback
      >
        <Input.Password placeholder="Input password" className="w-full" />
      </Form.Item>

      <Form.Item<AccountDetailsFieldType>
        label="Confirm Password"
        name="confirm_password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please input confirm password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('The new password that you entered do not match!'))
            },
          }),
        ]}
        className="w-full mb-4! text-neutral-950"
        required
      >
        <Input.Password placeholder="Input confirm password" className="w-full" />
      </Form.Item>
    </ModalForm>
  )
})

export default FormAccountDetails
