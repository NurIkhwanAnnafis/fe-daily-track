import type React from "react"
import { Typography } from "antd"
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
    expenseCategoryBreakdown,
    incomeCategoryBreakdown,
  } = useDashboardPage()

  return (
    <div className="w-full h-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Typography.Title level={4} className="m-0!">Dashboard</Typography.Title>
          <Typography.Text type="secondary" className="text-sm">Your financial overview</Typography.Text>
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

      <TrendChart data={monthlyTrend} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CategoryPieChart
          title="Expense by Category"
          description="No expense data for this month"
          data={expenseCategoryBreakdown}
        />
        <CategoryPieChart
          title="Income by Category"
          description="No income data for this month"
          data={incomeCategoryBreakdown}
        />
      </div>

      {/* Recent Transactions */}
      <RecentTransactions data={recentTransactions.data} date={selectedMonth.format('MMMM YYYY')} />
    </div>
  )
}

export default DashboardPage