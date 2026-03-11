import { useState } from "react"
import { message, type FormProps } from "antd"
import type { FieldType } from "../login.type"
import { setUserLocalStorage } from "../../../utils/localstorage"
import { useNavigate } from "@tanstack/react-router"
import { postLogin } from "../login.service"
import { runEffectSafe } from "../../../lib/runtime"
import { getErrorMessage } from "../../../utils/error"

export const useLogin = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleLogin: FormProps<FieldType>['onFinish'] = async (values) => {
    setLoading(true)

    const result = await runEffectSafe(
      postLogin({ email: values.email, password: values.password }),
    )

    setLoading(false)

    if (!result.success) {
      message.error(getErrorMessage(result.error))
      return
    }

    // API only returns tokens; use form values for user info
    setUserLocalStorage({
      id: 1,
      email: values.email,
      name: values.email,
      avatar: null,
      token: result.data.data.accessToken,
    })

    message.success('Login success')
    setTimeout(() => navigate({ to: '/dashboard' }), 1000)
  }

  return {
    handleLogin,
    loading,
  }
}
