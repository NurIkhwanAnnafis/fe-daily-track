import { useEffect, useState } from "react"
import dayjs, { type Dayjs } from "dayjs"
import { message } from "antd"
import { runEffectSafe } from "../../../lib/runtime"
import { useBlockLoading } from "../../../store/useBlockLoading.store"
import { defaultResponseList } from "../../../constants/common"
import type { CommonResponseList } from "../../../types/common"
import type { Report, Summary } from "../../report/report.type"
import type { CategoryBreakdown, MonthlyTrend } from "../dashboard.type"
import { getDashboardSummary, getRecentTransactions } from "../dashboard.service"
import { TRANSACTION_TYPE } from "../../../constants/transaction"

const defaultSummary: Summary = { income: 0, expense: 0, amount: 0, balance: 0 }

export const useDashboardPage = () => {
  const [selectedMonth, setSelectedMonth] = useState<Dayjs>(dayjs())
  const [summary, setSummary] = useState<Summary>(defaultSummary)
  const [recentTransactions, setRecentTransactions] = useState<CommonResponseList<Report>>(defaultResponseList)
  const [monthlyTrend, setMonthlyTrend] = useState<MonthlyTrend[]>([])
  const [categoryBreakdown, setCategoryBreakdown] = useState<CategoryBreakdown[]>([])

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

  const fetchRecentTransactions = async () => {
    const result = await runEffectSafe(
      getRecentTransactions({ page: '1', limit: '5' })
    )
    if (!result.success) {
      message.error('Failed to load recent transactions')
      return
    }
    setRecentTransactions(result.data)
  }

  const fetchMonthlyTrend = async () => {
    const months: MonthlyTrend[] = []
    for (let i = 5; i >= 0; i--) {
      const m = dayjs().subtract(i, 'month')
      const data = await fetchSummary(m)
      months.push({
        month: m.format('MMM YY'),
        income: data.income,
        expense: data.expense,
      })
    }
    setMonthlyTrend(months)
  }

  const fetchCategoryBreakdown = async (month: Dayjs) => {
    const result = await runEffectSafe(
      getRecentTransactions({
        page: '1',
        limit: '100',
        start_date: month.startOf('month').format('YYYY-MM-DD'),
        end_date: month.endOf('month').format('YYYY-MM-DD'),
      })
    )
    if (!result.success) return

    const expenseMap: Record<string, number> = {}
    result.data.data
      .filter((t) => t.type?.id === TRANSACTION_TYPE.EXPENSE)
      .forEach((t) => {
        const cat = t.category?.name ?? 'Uncategorized'
        expenseMap[cat] = (expenseMap[cat] ?? 0) + t.amount
      })

    const breakdown: CategoryBreakdown[] = Object.entries(expenseMap)
      .map(([category, total]) => ({ category, total }))
      .sort((a, b) => b.total - a.total)

    setCategoryBreakdown(breakdown)
  }

  useEffect(() => {
    const run = async () => {
      setLoading(true)
      const [summaryData] = await Promise.all([
        fetchSummary(selectedMonth),
        fetchRecentTransactions(),
        fetchCategoryBreakdown(selectedMonth),
      ])
      setSummary(summaryData)
      setLoading(false)
    }
    run()
  }, [selectedMonth])

  useEffect(() => {
    fetchMonthlyTrend()
  }, [])

  return {
    selectedMonth,
    prevMonth,
    nextMonth,
    summary,
    recentTransactions,
    monthlyTrend,
    categoryBreakdown,
  }
}