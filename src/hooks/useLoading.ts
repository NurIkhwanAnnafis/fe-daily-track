import { useEffect } from "react"
import { useBlockLoading } from "../store/useBlockLoading.store"

export const useLoading = (flag: boolean) => {
  const { setLoading } = useBlockLoading()

  useEffect(() => {
    setLoading(flag)
  }, [flag])
}