import type { User } from "../types/user"

type UserStorage = {
  user?: User
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