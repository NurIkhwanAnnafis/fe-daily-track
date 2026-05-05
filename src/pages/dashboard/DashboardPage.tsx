import type React from "react"
import { useDashboardPage } from "./hooks/useDashboardPage"
import MonthNavigator from "./component/MonthNavigator"
import SummaryCards from "./component/SummaryCards"
import TrendChart from "./component/TrendChart"
import CategoryPieChart from "./component/CategoryPieChart"
import RecentTransactions from "./component/RecentTransactions"

const DashboardPage: React.FC = () => {
  const {
    selectedMonth,
    prevMonth,
    nextMonth,
    summary,
    recentTransactions,
    monthlyTrend,
    categoryBreakdown,
  } = useDashboardPage()

  return (
    <div className="w-full h-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-800 m-0">Dashboard</h1>
          <p className="text-sm text-gray-500 m-0">Your financial overview</p>
        </div>
        <MonthNavigator
          selectedMonth={selectedMonth}
          onPrev={prevMonth}
          onNext={nextMonth}
        />
      </div>

      {/* Summary Cards */}
      <SummaryCards
        balance={summary.balance}
        income={summary.income}
        expense={summary.expense}
        amount={summary.amount}
      />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <TrendChart data={monthlyTrend} />
        </div>
        <div className="lg:col-span-2">
          <CategoryPieChart data={categoryBreakdown} />
        </div>
      </div>

      {/* Recent Transactions */}
      <RecentTransactions data={recentTransactions.data} />
    </div>
  )
}

export default DashboardPage