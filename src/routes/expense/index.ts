import { createFileRoute } from "@tanstack/react-router";
import Expense from "../../pages/expense/ExpensePage";

export const Route = createFileRoute('/expense/')({
  component: Expense,
})