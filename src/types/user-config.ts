export type UserConfig = {
  id: string,
  config: {
    initial_amount: number,
    income_limit_per_day: number,
    expense_limit_per_day: number,
    income_limit_per_month: number,
    expense_limit_per_month: number
  }
}