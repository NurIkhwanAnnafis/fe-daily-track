import { Outlet, useLocation } from "@tanstack/react-router"
import { ConfigProvider } from 'antd';
import MainLayout from "./MainLayout"
import { useMemo } from "react"
import { tokenTheme } from "../../constants/theme";
import AuthLayout from "./AuthLayout";
import Loading from "../Loading/Loading";
import { useBlockLoading } from "../../store/useBlockLoading.store";

const authRoutes = [
  "/login", "/login/",
  "/register", "/register/",
  "/forgot-password", "/forgot-password/",
  "/reset-password", "/reset-password/",
]

const Layout = () => {
  const location = useLocation()
  const { loading } = useBlockLoading()
  const isAuthPages = useMemo(() => {
    return authRoutes.includes(location.pathname)
  }, [location])

  if (isAuthPages) {
    return (
      <div className="w-screen h-screen">
        <ConfigProvider theme={tokenTheme}>
          <AuthLayout>
            <Outlet />
          </AuthLayout>
        </ConfigProvider>
      </div>
    )
  }

  return (
    <div className="w-screen h-screen">
      <ConfigProvider theme={tokenTheme}>
        {loading && <Loading />}
        <MainLayout>
          <Outlet />
        </MainLayout>
      </ConfigProvider>
    </div>
  )
}

export default Layout