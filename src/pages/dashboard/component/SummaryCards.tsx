import { Card, Tooltip, Typography } from "antd"
import {
  WalletOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  SwapOutlined,
} from "@ant-design/icons"
import type React from "react"
import { numberFormatter } from "../../../utils/number"
import type { Summary } from "../../report/report.type"

type Props = Summary

const cardConfig = [
  {
    key: 'balance' as keyof Summary,
    title: 'Total Balance',
    tooltip: 'Overall balance across all time',
    icon: <WalletOutlined />,
    color: '#6366f1',
    bg: '#eef2ff',
    format: (v: number) => numberFormatter(v, 'id'),
    textType: (v: number): 'success' | 'danger' | undefined =>
      v === 0 ? undefined : v > 0 ? 'success' : 'danger',
    prefix: (v: number) => (v > 0 ? '+' : ''),
  },
  {
    key: 'income' as keyof Summary,
    title: 'Income',
    tooltip: 'Total income for the selected month',
    icon: <ArrowUpOutlined />,
    color: '#16a34a',
    bg: '#f0fdf4',
    format: (v: number) => `+${numberFormatter(v, 'id')}`,
    textType: (_: number): 'success' => 'success',
    prefix: () => '',
  },
  {
    key: 'expense' as keyof Summary,
    title: 'Expense',
    tooltip: 'Total expenses for the selected month',
    icon: <ArrowDownOutlined />,
    color: '#dc2626',
    bg: '#fef2f2',
    format: (v: number) => `-${numberFormatter(v, 'id')}`,
    textType: (_: number): 'danger' => 'danger',
    prefix: () => '',
  },
  {
    key: 'amount' as keyof Summary,
    title: 'Net',
    tooltip: 'Income minus Expense for the selected month',
    icon: <SwapOutlined />,
    color: '#d97706',
    bg: '#fffbeb',
    format: (v: number) => numberFormatter(v, 'id'),
    textType: (v: number): 'success' | 'danger' | undefined =>
      v === 0 ? undefined : v > 0 ? 'success' : 'danger',
    prefix: (v: number) => (v > 0 ? '+' : ''),
  },
]

const SummaryCards: React.FC<Props> = ({ balance, income, expense, amount }) => {
  const values: Summary = { balance, income, expense, amount }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cardConfig.map((cfg) => {
        const value = values[cfg.key]
        return (
          <Card
            key={cfg.key}
            variant="outlined"
            className="!rounded-xl"
            styles={{ body: { padding: '16px 20px' } }}
          >
            <div className="flex items-center justify-between mb-3">
              <Tooltip title={cfg.tooltip}>
                <Typography.Text type="secondary" className="text-sm">
                  {cfg.title}
                </Typography.Text>
              </Tooltip>
              <span
                className="flex items-center justify-center w-8 h-8 rounded-full text-sm"
                style={{ background: cfg.bg, color: cfg.color }}
              >
                {cfg.icon}
              </span>
            </div>
            <Typography.Text type={cfg.textType(value)}>
              <span className="text-xl font-semibold">
                {cfg.format(value)}
              </span>
            </Typography.Text>
          </Card>
        )
      })}
    </div>
  )
}

export default SummaryCards
