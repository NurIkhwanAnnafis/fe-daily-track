import { useEffect, useState } from "react"
import dayjs, { type Dayjs } from "dayjs"
import { message } from "antd"
import { runEffectSafe } from "../../../lib/runtime"
import { useBlockLoading } from "../../../store/useBlockLoading.store"
import { defaultResponseList } from "../../../constants/common"
import type { CommonResponseList } from "../../../types/common"
import type { Report, Summary } from "../../report/report.type"
import type { CategoryBreakdown, MonthlyTrend } from "../dashboard.type"
import {
  getDashboardSummary,
  getRecentTransactions,
  getTransactionExpense,
  getTransactionIncome,
  getTrendTransactionsLastSixMonth
} from "../dashboard.service"

const defaultSummary: Summary = { income: 0, expense: 0, amount: 0, balance: 0 }

export const useDashboardPage = () => {
  const [selectedMonth, setSelectedMonth] = useState<Dayjs>(dayjs())
  const [summary, setSummary] = useState<Summary>(defaultSummary)
  const [recentTransactions, setRecentTransactions] = useState<CommonResponseList<Report>>(defaultResponseList)
  const [monthlyTrend, setMonthlyTrend] = useState<MonthlyTrend[]>([])
  const [expenseCategoryBreakdown, setExpenseCategoryBreakdown] = useState<CategoryBreakdown[]>([])
  const [incomeCategoryBreakdown, setIncomeCategoryBreakdown] = useState<CategoryBreakdown[]>([])

  const { setLoading } = useBlockLoading()

  const prevMonth = () => setSelectedMonth((m) => m.subtract(1, 'month'))
  const nextMonth = () => setSelectedMonth((m) => m.add(1, 'month'))

  const fetchSummary = async (month: Dayjs) => {
    const result = await runEffectSafe(
      getDashboardSummary({
        page: '1',
        limit: '1',
        start_date: month.startOf('month').format('YYYY-MM-DD'),
        end_date: month.endOf('month').format('YYYY-MM-DD'),
      })
    )
    if (!result.success) return defaultSummary
    return result.data.data
  }

  const fetchRecentTransactions = async (month: Dayjs) => {
    const result = await runEffectSafe(
      getRecentTransactions({
        page: 1,
        limit: 5,
        start_date: month.startOf('month').format('YYYY-MM-DD'),
        end_date: month.endOf('month').format('YYYY-MM-DD'),
      })
    )
    if (!result.success) {
      message.error('Failed to load recent transactions')
      return
    }
    setRecentTransactions(result.data)
  }

  const fetchMonthlyTrend = async (month: Dayjs) => {
    const result = await runEffectSafe(
      getTrendTransactionsLastSixMonth({
        date: month.format('YYYY-MM-DD'),
      })
    )
    if (!result.success) {
      message.error('Failed to load monthly trend')
      return
    }
    setMonthlyTrend(result.data.data)
  }

  const fetchCategoryBreakdown = async (month: Dayjs) => {
    const [expenseResult, incomeResult] = await Promise.all([
      runEffectSafe(
        getTransactionExpense({
          date: month.format('YYYY-MM-DD'),
        })
      ),
      runEffectSafe(
        getTransactionIncome({
          date: month.format('YYYY-MM-DD'),
        })
      )
    ])
    if (!expenseResult.success || !incomeResult.success) {
      message.error('Failed to load category breakdown')
      return
    }

    setExpenseCategoryBreakdown(expenseResult.data.data)
    setIncomeCategoryBreakdown(incomeResult.data.data)
  }

  useEffect(() => {
    const run = async () => {
      setLoading(true)
      const [summaryData] = await Promise.all([
        fetchSummary(selectedMonth),
        fetchRecentTransactions(selectedMonth),
        fetchCategoryBreakdown(selectedMonth),
        fetchMonthlyTrend(selectedMonth),
      ])
      setSummary(summaryData)
      setLoading(false)
    }
    run()
  }, [selectedMonth])

  return {
    selectedMonth,
    prevMonth,
    nextMonth,
    summary,
    recentTransactions,
    monthlyTrend,
    expenseCategoryBreakdown,
    incomeCategoryBreakdown,
  }
}