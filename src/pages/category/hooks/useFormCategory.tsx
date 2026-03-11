import { message, type FormProps } from "antd"
import type { CategoryFieldType } from "../category.type"
import { runEffectSafe } from "../../../lib/runtime"
import { createCategory } from "../category.service"

type Props = {
  onSuccess: () => void
}

export const useFormCategory = (props: Props) => {
  const { onSuccess } = props

  const onSubmit: FormProps<CategoryFieldType>['onFinish'] = async (values) => {
    
    const result = await runEffectSafe(createCategory(values))

    if(!result.success) {
      return message.error(result.error.message)
    }

    message.success('Create category success')
    onSuccess()
  }

  return {
    onSubmit
  }
}