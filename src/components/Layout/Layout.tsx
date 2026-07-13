import { Outlet, useLocation } from "@tanstack/react-router"
import { ConfigProvider } from 'antd';
import MainLayout from "./MainLayout"
import { useEffect, useMemo } from "react"
import { getAppTheme } from "../../constants/theme";
import AuthLayout from "./AuthLayout";
import Loading from "../Loading/Loading";
import { useBlockLoading } from "../../store/useBlockLoading.store";
import { useThemeMode } from "../../store/useThemeMode.store";

const authRoutes = [
  "/login", "/login/",
  "/register", "/register/",
  "/forgot-password", "/forgot-password/",
  "/reset-password", "/reset-password/",
]

const Layout = () => {
  const location = useLocation()
  const { loading } = useBlockLoading()
  const { mode } = useThemeMode()
  const isAuthPages = useMemo(() => {
    return authRoutes.includes(location.pathname)
  }, [location])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark')
  }, [mode])

  const appTheme = useMemo(() => getAppTheme(mode), [mode])

  if (isAuthPages) {
    return (
      <div className="w-screen h-screen">
        <ConfigProvider theme={appTheme}>
          <AuthLayout>
            <Outlet />
          </AuthLayout>
        </ConfigProvider>
      </div>
    )
  }

  return (
    <div className="w-screen h-screen overflow-x-auto">
      <ConfigProvider theme={appTheme}>
        {loading && <Loading />}
        <MainLayout>
          <Outlet />
        </MainLayout>
      </ConfigProvider>
    </div>
  )
}

export default Layout