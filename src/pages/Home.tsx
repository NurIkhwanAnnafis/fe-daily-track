import type React from "react"
import Loading from "../components/Loading/Loading"
import { getUserLocalStorage } from "../utils/localstorage"
import { useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"

const Home: React.FC = () => {
  const user = getUserLocalStorage()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate({ to: '/login' })
    } else {
      navigate({ to: '/dashboard' })
    }
  }, [user, navigate])


  return <Loading />
}

export default Home