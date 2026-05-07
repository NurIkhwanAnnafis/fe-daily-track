import { useForm } from "antd/es/form/Form";
import type { User } from "../../../types/user";
import { useModal } from "../../../hooks/useModal";
import type { AccountDetailsFieldType } from "../profilte.type";
import { useBlockLoading } from "../../../store/useBlockLoading.store";
import { runEffectSafe } from "../../../lib/runtime";
import { message } from "antd";
import { updateUserById } from "../../../services/user.service";

type Props = {
  onSuccess: () => void | Promise<unknown>
}

export const useFormAccountDetails = (props: Props) => {
  const {
    onSuccess,
  } = props
  const { setLoading } = useBlockLoading()

  const [form] = useForm()
  const modal = useModal<User>()

  const handleCloseModal = () => {
    modal.setModal({
      open: false,
      type: 'edit',
    })
    form.resetFields()
  }

  const handleUpdate = (user?: User) => {
    if (!user) {
      return message.warning('User not found')
    }

    const dataForm: AccountDetailsFieldType = {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      confirm_password: '',
      password: '',
    }

    modal.setModal({
      open: true,
      type: 'edit',
      data: user,
    })

    form.setFieldsValue(dataForm)
  }


  const onSubmit = async (values: AccountDetailsFieldType) => {
    setLoading(true)
    const result = await runEffectSafe(updateUserById(modal.modal.data?.id ?? '', values))
    setLoading(false)

    if (!result.success) {
      return message.error('Failed to update account details')
    }

    message.success('Account Details updated successfully')
    handleCloseModal()
    onSuccess()
  }

  return {
    modal: modal.modal,
    form,
    onSubmit,
    handleUpdate,
    handleCloseModal,
  }
}