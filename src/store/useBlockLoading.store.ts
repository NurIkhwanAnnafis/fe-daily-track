import { create } from "zustand"

type State = {
  loading: boolean,
  setLoading: (loading: boolean) => void
}

export const useBlockLoading = create<State>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading })
}))


