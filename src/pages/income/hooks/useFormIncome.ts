import type { IncomeFieldType } from "../income.type"
import { useForm } from "antd/es/form/Form"
import { runEffectSafe } from "../../../lib/runtime"
import { message } from "antd"
import { useModal } from "../../../hooks/useModal"
import { useState } from "react"
import { createIncome, getIncomeDetail, updateIncome } from "../income.service"
import { useBlockLoading } from "../../../store/useBlockLoading.store"
import dayjs from "dayjs"

type Props = {
  onSuccess: () => void | Promise<unknown>
}

export const useFormIncome = ({ onSuccess }: Props) => {
  const modal = useModal()
  const [form] = useForm<IncomeFieldType>()
  const [id, setId] = useState<string | null>(null)
  const { setLoading } = useBlockLoading()

  const handleCloseModal = () => {
    modal.setModal({
      open: false,
      type: 'create',
    })
    form.resetFields()
  }

  const onSubmit = async (values: IncomeFieldType) => {
    setLoading(true)
    const result = await runEffectSafe(
      id ? updateIncome(id, values) : createIncome(values)
    )
    setLoading(false)

    if (!result.success) {
      return message.error('Failed to save expense')
    }

    message.success('Expense saved successfully')
    handleCloseModal()
    onSuccess()
  }

  const handleCreate = () => {
    modal.setModal({
      open: true,
      type: 'create',
    })
    form.resetFields()
  }

  const fetchDetail = async (id: string) => {
    setLoading(true)
    const result = await runEffectSafe(getIncomeDetail(id))
    setLoading(false)

    if (!result.success) {
      message.error('Failed to fetch income')
      return
    }

    form.setFieldsValue({
      merchant_name: result.data.merchant_name,
      description: result.data.description,
      amount: result.data.amount,
      date: dayjs(result.data.date),
      category_id: result.data.category?.id,
    })
    modal.setModal({
      open: true,
      type: 'edit',
      data: result.data,
    })
    setId(id)
  }

  return {
    modal: modal.modal,
    form,
    setModal: modal.setModal,
    onSubmit,
    handleCreate,
    fetchDetail,
    handleCloseModal,
  }
}