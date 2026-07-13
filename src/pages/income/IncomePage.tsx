import { theme } from "antd"
import DataTable from "../../components/DataTable/DataTable"
import { Filter } from "../../components/Filter/Filter"
import PageContainer from "../../components/PageContainer/PageContainer"
import type { Income, IncomeFilter } from "./income.type"
import { useIncomePage } from "./hooks/useIncomePage"
import FormIncome from "./component/FormIncome"
import { ExpandedRowRender } from "../../components/DataTable/ExpandedRowRender"

const IncomePage = () => {
  const {
    token: { colorBorderSecondary },
  } = theme.useToken()
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
        <Filter.Container className="max-lg:grid lg:grid-cols-2! sm:grid-cols-1! lg:gap-4">
          <div className="grid md:grid-cols-3! grid-cols-1 gap-4 mb-4">
            {renderSchema()}
          </div>
          <div className="flex justify-end gap-2 items-end h-full">
            <div className="flex gap-4">
              <Filter.Reset onReset={onReset} />
              <span className="h-auto w-px" style={{ background: colorBorderSecondary }} />
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
        expandedRowRender={(record) => ExpandedRowRender<Income>({ column, record })}
      />
    </PageContainer>
  )
}

export default IncomePage
