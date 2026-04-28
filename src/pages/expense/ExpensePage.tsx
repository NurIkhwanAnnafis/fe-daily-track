import DataTable from "../../components/DataTable/DataTable"
import { ExpandedRowRender } from "../../components/DataTable/ExpandedRowRender"
import { Filter } from "../../components/Filter/Filter"
import PageContainer from "../../components/PageContainer/PageContainer"
import FormExpense from "./component/FormExpense"
import type { Expense, ExpenseFilter } from "./expense.type"
import { useExpensePage } from "./hooks/useExpensePage"

const ExpensePage = () => {
  const {
    datasource,
    column,
    form,
    categories,
    refFormExpense,
    onReset,
    onSubmit,
    renderSchema,
    renderActiveFilter,
    onChangePagination,
    fetchExpenses,
  } = useExpensePage()

  return (
    <PageContainer
      title="Expense"
      description="Track and manage your expense transactions"
      onCreate={() => refFormExpense.current?.handleCreate()}
    >
      <FormExpense
        ref={refFormExpense}
        onSuccess={fetchExpenses}
        categories={categories}
      />

      <Filter.Root<ExpenseFilter> onSubmit={onSubmit} form={form}>
        <Filter.Container className="max-lg:grid lg:grid-cols-2! sm:grid-cols-1! lg:gap-4">
          <div className="grid md:grid-cols-3! grid-cols-1 gap-4 mb-4">
            {renderSchema()}
          </div>
          <div className="flex justify-end gap-2 items-end h-full">
            <div className="flex gap-4">
              <Filter.Reset onReset={onReset} />
              <span className="h-auto w-px bg-neutral-300" />
              <Filter.Submit />
            </div>
          </div>
        </Filter.Container>
        {renderActiveFilter()}
      </Filter.Root>

      <DataTable
        columns={column}
        dataSource={datasource.data}
        meta={{
          total: datasource.meta.total,
          page: datasource.meta.page,
          pageSize: datasource.meta.page_size,
        }}
        onChangePagination={onChangePagination}
        expandedRowRender={(record) => ExpandedRowRender<Expense>({ column, record })}
      />
    </PageContainer>
  )
}

export default ExpensePage