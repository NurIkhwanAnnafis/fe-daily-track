import type { User } from "../types/user"

export const getUserLocalStorage = (): User | null => {
  return JSON.parse(localStorage.getItem("user") || "null")
}

export const setUserLocalStorage = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user))
}

export const removeUserLocalStorage = () => {
  localStorage.removeItem("user")
}