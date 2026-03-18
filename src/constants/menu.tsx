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
    title: 'Dashboard Management',
    onClick: () => navigate({ to: '/dashboard' }),
    label: 'Dashboard'
  },
  {
    key: '/report',
    icon: createElement(FallOutlined),
    title: 'Report Management',
    onClick: () => navigate({ to: '/report' }),
    label: 'Report'
  },
  {
    key: '/expense',
    icon: createElement(FallOutlined),
    title: 'Expense Management',
    onClick: () => navigate({ to: '/expense' }),
    label: 'Expense'
  },
  {
    key: '/income',
    icon: createElement(RiseOutlined),
    title: 'Income Management',
    onClick: () => navigate({ to: '/income' }),
    label: 'Income'
  },
  {
    key: '/category',
    icon: createElement(GroupOutlined),
    title: 'Category Management',
    onClick: () => navigate({ to: '/category' }),
    label: 'Category'
  },
]