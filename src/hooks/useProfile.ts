import { useEffect } from "react"
import { runEffectSafe } from "../lib/runtime"
import { getUserById } from "../services/user.service"
import { useBlockLoading } from "../store/useBlockLoading.store"
import { getUserLocalStorage, setUserLocalStorage } from "../utils/localstorage"

type Props = {
  enabled?: boolean
}

export const useProfile = (props: Props) => {
  const { enabled = false } = props
  const { setLoading } = useBlockLoading()
  const currentData = getUserLocalStorage()

  const fetchProfile = async () => {
    if (!currentData?.user_id) {
      return
    }

    setLoading(true)

    const result = await runEffectSafe(getUserById(currentData.user_id))

    setLoading(false)

    if (!result.success) {
      console.error(result.error)
      return
    }

    const profile = {
      ...currentData,
      user: result.data
    }

    setUserLocalStorage(profile)
  }

  useEffect(() => {
    if (enabled) {
      fetchProfile()
    }
  }, [enabled, currentData?.token])

  return {
    fetchProfile,
    currentData,
    profile: currentData?.user,
  }
}