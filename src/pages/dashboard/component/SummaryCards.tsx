import { Card, Tooltip, Typography, theme } from "antd"
import {
  WalletOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  SwapOutlined,
} from "@ant-design/icons"
import type React from "react"
import { numberFormatter } from "../../../utils/number"
import type { Summary } from "../../report/report.type"
import { BALANCE_COLOR } from "../../../constants/chartColors"
import { useThemeMode } from "../../../store/useThemeMode.store"

type Props = Summary

const SummaryCards: React.FC<Props> = ({ balance, income, expense, amount }) => {
  const values: Summary = { balance, income, expense, amount }
  const { mode } = useThemeMode()
  const {
    token: { colorSuccess, colorError, colorWarning },
  } = theme.useToken()

  const cardConfig = [
    {
      key: 'balance' as keyof Summary,
      title: 'Total Balance',
      tooltip: 'Overall balance across all time',
      icon: <WalletOutlined />,
      color: BALANCE_COLOR[mode],
      format: (v: number) => numberFormatter(v, 'id'),
      textType: (v: number): 'success' | 'danger' | undefined =>
        v === 0 ? undefined : v > 0 ? 'success' : 'danger',
    },
    {
      key: 'income' as keyof Summary,
      title: 'Income',
      tooltip: 'Total income for the selected month',
      icon: <ArrowUpOutlined />,
      color: colorSuccess,
      format: (v: number) => `+${numberFormatter(v, 'id')}`,
      textType: (): 'success' => 'success',
    },
    {
      key: 'expense' as keyof Summary,
      title: 'Expense',
      tooltip: 'Total expenses for the selected month',
      icon: <ArrowDownOutlined />,
      color: colorError,
      format: (v: number) => `-${numberFormatter(v, 'id')}`,
      textType: (): 'danger' => 'danger',
    },
    {
      key: 'amount' as keyof Summary,
      title: 'Net',
      tooltip: 'Income minus Expense for the selected month',
      icon: <SwapOutlined />,
      color: colorWarning,
      format: (v: number) => numberFormatter(v, 'id'),
      textType: (v: number): 'success' | 'danger' | undefined =>
        v === 0 ? undefined : v > 0 ? 'success' : 'danger',
    },
  ]

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
                style={{ background: `${cfg.color}22`, color: cfg.color }}
              >
                {cfg.icon}
              </span>
            </div>
            <Typography.Text type={cfg.textType(value)}>
              <span className="text-xl font-semibold font-tabular">
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
