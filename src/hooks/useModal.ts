import { useState } from "react"

export const useModal = <T>() => {
  const [modal, setModal] = useState<{
    open: boolean
    type: 'create' | 'edit'
    data?: T
  }>({
    open: false,
    type: 'create',
  })

  return {
    modal,
    setModal,
  }
}