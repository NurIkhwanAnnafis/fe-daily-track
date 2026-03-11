import type React from "react"
import Loading from "../components/Loading/Loading"
import { getUserLocalStorage } from "../utils/localstorage"
import { Navigate } from "@tanstack/react-router"

const Home: React.FC = () => {
  const user = getUserLocalStorage()

  if (!user) {
    return <Navigate to="/login" />
  }

  return <Loading />
}

export default Home