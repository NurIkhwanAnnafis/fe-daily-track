import DataTable from "../../components/DataTable/DataTable"
import { Filter } from "../../components/Filter/Filter"
import PageContainer from "../../components/PageContainer/PageContainer"
import type { IncomeFilter } from "./income.type"
import { useIncomePage } from "./hooks/useIncomePage"
import FormIncome from "./component/FormIncome"

const Income = () => {
  const {
    datasource,
    column,
    form,
    categories,
    refFormIncome,
    onReset,
    onSubmit,
    renderSchema,
    renderActiveFilter,
    onChangePagination,
    fetchIncomes,
  } = useIncomePage()

  return (
    <PageContainer
      title="Income"
      description="Track and manage your income transactions"
      onCreate={() => refFormIncome.current?.handleCreate()}
    >
      <FormIncome
        ref={refFormIncome}
        categories={categories}
        onSuccess={fetchIncomes}
      />

      <Filter.Root<IncomeFilter> onSubmit={onSubmit} form={form}>
        <Filter.Container className="">
          <div className="grid grid-cols-4 gap-4">
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
      />
    </PageContainer>
  )
}

export default Income