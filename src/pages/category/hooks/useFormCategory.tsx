import { Form, message, type FormProps } from "antd"
import type { CategoryDetail, CategoryFieldType } from "../category.type"
import { runEffectSafe } from "../../../lib/runtime"
import { createCategory, getCategoryById, updateCategory } from "../category.service"
import { useBlockLoading } from "../../../store/useBlockLoading.store"
import { useEffect, useState } from "react"
import { useModal } from "../../../hooks/useModal"

type Props = {
  onSuccess: () => void
}

export const useFormCategory = (props: Props) => {
  const { onSuccess } = props
  const { setLoading } = useBlockLoading()
  const [form] = Form.useForm<CategoryFieldType>()
  const modal = useModal<CategoryDetail>()
  const [id, setId] = useState<string | null>(null)

  const onSubmit: FormProps<CategoryFieldType>['onFinish'] = async (values) => {
    setLoading(true)
    let result = null

    if (!id) {
      result = await runEffectSafe(createCategory(values))
    } else {
      result = await runEffectSafe(updateCategory(values, id))
    }

    setLoading(false)
    if (!result.success) {
      return message.error(result.error.message)
    }

    message.success(`${id ? 'Update' : 'Create'} category success`)
    onSuccess()
  }

  const handleCreate = () => {
    modal.setModal({
      open: true,
      type: 'create',
    })
  }

  const handleEdit = (data: CategoryDetail) => {
    modal.setModal({
      open: true,
      type: 'edit',
      data,
    })
    setId(data.id)
    form.setFieldsValue({
      name: data.name,
      type_ids: data.category_types.map((type) => type.type_id),
    })
  }

  const handleCloseModal = () => {
    modal.setModal({
      open: false,
      type: 'create',
    })
    setId(null)
    form.resetFields()
  }

  const fetchDetail = async (id: string) => {
    setLoading(true)
    const result = await runEffectSafe(getCategoryById(id))

    setLoading(false)

    if (!result.success) {
      message.error(result.error.message)
      return
    }

    handleEdit(result.data)
  }

  useEffect(() => {
    return () => setId(null)
  }, [])

  return {
    modal: modal.modal,
    form,
    setModal: modal.modal,
    onSubmit,
    handleCreate,
    handleEdit,
    fetchDetail,
    handleCloseModal,
  }
}