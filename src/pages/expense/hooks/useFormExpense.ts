import type { ExpenseFieldType } from "../expense.type"
import { useForm } from "antd/es/form/Form"
import { runEffectSafe } from "../../../lib/runtime"
import { createExpense, getExpenseDetail, updateExpense } from "../expense.service"
import { message } from "antd"
import { useModal } from "../../../hooks/useModal"
import { useState } from "react"

type Props = {
  onSuccess: () => void | Promise<unknown>
}

export const useFormExpense = ({ onSuccess }: Props) => {
  const modal = useModal()
  const [form] = useForm<ExpenseFieldType>()
  const [id, setId] = useState<string | null>(null)

  const handleCloseModal = () => {
    modal.setModal({
      open: false,
      type: 'create',
    })
    form.resetFields()
  }

  const onSubmit = async (values: ExpenseFieldType) => {
    const result = await runEffectSafe(
      id ? updateExpense(id, values) : createExpense(values)
    )

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
    const result = await runEffectSafe(getExpenseDetail(id))

    if (!result.success) {
      message.error('Failed to fetch expense')
      return
    }

    form.setFieldsValue({
      merchant_name: result.data.merchant_name,
      description: result.data.description,
      amount: result.data.amount,
      date: result.data.date,
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