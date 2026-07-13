
import { theme, type MenuProps } from 'antd';
import type { MenuItemType } from 'antd/es/menu/interface';
import { LogoutOutlined, UserOutlined } from "@ant-design/icons"
import { createMenu } from '../../../constants/menu';
import { useNavigate } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { useScreen } from '../../../utils/screen';
import { useProfile } from '../../../hooks/useProfile';
import { useBlockLoading } from '../../../store/useBlockLoading.store';
import { useThemeMode } from '../../../store/useThemeMode.store';
import { runEffectSafe } from '../../../lib/runtime';
import { postLogout } from '../../../pages/login/login.service';
import { removeUserLocalStorage } from '../../../utils/localstorage';

export const useMainLayout = () => {
  const {
    token: { colorBgContainer, colorBgLayout, colorBorderSecondary },
  } = theme.useToken();
  const { mode, toggle: toggleThemeMode } = useThemeMode()
  const screen = useScreen()
  const { currentData, profile } = useProfile({ enabled: true })
  const { setLoading } = useBlockLoading()

  const [selectedKeys, setSelectedKeys] = useState<string[]>(['/dashboard'])
  const [collapsed, setCollapsed] = useState(false)

  const navigate = useNavigate()
  const menuItems = useMemo(() => createMenu(navigate), [navigate])
  const currentMenu = menuItems?.find(x => x?.key === selectedKeys[0]) as MenuItemType | undefined

  const handleLogout = async () => {
    if (!currentData?.refresh_token) return

    setLoading(true)

    const result = await runEffectSafe(postLogout({
      refresh_token: currentData.refresh_token,
    }))

    setLoading(false)

    if (!result.success) {
      console.error('Logout Error')
      return
    }

    removeUserLocalStorage()
    navigate({ to: '/login' })
  }

  const handleClickItems: MenuProps['onClick'] = (e) => {
    if (e.key === 'profile') {
      navigate({ to: '/profile' })
    } else if (e.key === 'logout') {
      handleLogout()
    }
  }

  const profileMenuItems = [
    {
      key: 'profile',
      label: 'Profile',
      icon: <UserOutlined />,
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      danger: true,
    },
  ]

  return {
    colorBgContainer,
    colorBgLayout,
    colorBorderSecondary,
    mode,
    toggleThemeMode,
    screen,
    profile,
    selectedKeys,
    collapsed,
    menuItems,
    currentMenu,
    profileMenuItems,
    setCollapsed,
    setSelectedKeys,
    handleClickItems,
  }
}