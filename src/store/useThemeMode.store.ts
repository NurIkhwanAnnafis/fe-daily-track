import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { ThemeMode } from "../constants/theme"

type State = {
  mode: ThemeMode
  toggle: () => void
  setMode: (mode: ThemeMode) => void
}

export const useThemeMode = create<State>()(
  persist(
    (set, get) => ({
      mode: "dark",
      toggle: () => set({ mode: get().mode === "dark" ? "light" : "dark" }),
      setMode: (mode) => set({ mode }),
    }),
    { name: "theme-mode" }
  )
)
