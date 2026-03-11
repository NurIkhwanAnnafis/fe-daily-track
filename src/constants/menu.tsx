import { createElement } from "react"
import {
  DashboardOutlined,
  GroupOutlined,
  FallOutlined,
  RiseOutlined,
} from "@ant-design/icons"
import type { MenuProps } from "antd"
import type { UseNavigateResult } from "@tanstack/react-router"

export const createMenu = (navigate: UseNavigateResult<string>): MenuProps['items'] => [
  {
    key: '/dashboard',
    icon: createElement(DashboardOutlined),
    label: 'Dashboard Management',
    onClick: () => navigate({ to: '/dashboard' }),
  },
  {
    key: '/report',
    icon: createElement(FallOutlined),
    label: 'Report Management',
    onClick: () => navigate({ to: '/report' })
  },
  {
    key: '/expense',
    icon: createElement(FallOutlined),
    label: 'Expense Management',
    onClick: () => navigate({ to: '/expense' })
  },
  {
    key: '/income',
    icon: createElement(RiseOutlined),
    label: 'Income Management',
    onClick: () => navigate({ to: '/income' })
  },
  {
    key: '/category',
    icon: createElement(GroupOutlined),
    label: 'Category Management',
    onClick: () => navigate({ to: '/category' })
  },
]