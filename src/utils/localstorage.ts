import type { User } from "../types/user"
import type { UserConfig } from "../types/user-config"

type UserStorage = {
  user?: User
  user_config?: UserConfig
  token: string
  refresh_token: string
  user_id: string
}

export const getUserLocalStorage = (): UserStorage | null => {
  return JSON.parse(localStorage.getItem("user") || "null")
}

export const setUserLocalStorage = (userStorage: UserStorage) => {
  localStorage.setItem("user", JSON.stringify(userStorage))
}

export const removeUserLocalStorage = () => {
  localStorage.removeItem("user")
}