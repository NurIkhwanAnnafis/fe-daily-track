import { useForm } from "antd/es/form/Form";
import { useModal } from "../../../hooks/useModal";
import type { UserConfigFieldType } from "../profilte.type";
import { useBlockLoading } from "../../../store/useBlockLoading.store";
import { runEffectSafe } from "../../../lib/runtime";
import { message } from "antd";
import type { UserConfig } from "../../../types/user-config";
import { createUserConfig, updateUserConfig } from "../../../services/user-config.service";

type Props = {
  onSuccess: () => void | Promise<unknown>
}

export const useFormUserConfig = (props: Props) => {
  const {
    onSuccess,
  } = props
  const { setLoading } = useBlockLoading()

  const [form] = useForm()
  const modal = useModal<UserConfig>()

  const handleCloseModal = () => {
    modal.setModal({
      open: false,
      type: 'edit',
    })
    form.resetFields()
  }

  const handleUpdate = (userConfig?: UserConfig) => {
    const dataForm: UserConfigFieldType = {
      expense_limit_per_day: userConfig?.config.expense_limit_per_day || 0,
      expense_limit_per_month: userConfig?.config.expense_limit_per_month || 0,
      income_limit_per_day: userConfig?.config.income_limit_per_day || 0,
      income_limit_per_month: userConfig?.config.income_limit_per_month || 0,
      initial_amount: userConfig?.config.initial_amount || 0,
    }

    modal.setModal({
      open: true,
      type: 'edit',
      data: userConfig,
    })

    form.setFieldsValue(dataForm)
  }


  const onSubmit = async (values: UserConfigFieldType) => {
    setLoading(true)
    let result

    if (modal.modal.data?.id) {
      result = await runEffectSafe(updateUserConfig(values))
    } else {
      result = await runEffectSafe(createUserConfig(values))
    }

    setLoading(false)

    if (!result.success) {
      return message.error('Failed to update financial configuration')
    }

    message.success('Financial configuration updated successfully')
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