import DataTable from "../../components/DataTable/DataTable"
import { ExpandedRowRender } from "../../components/DataTable/ExpandedRowRender"
import { Filter } from "../../components/Filter/Filter"
import PageContainer from "../../components/PageContainer/PageContainer"
import CardTotal from "./component/CardTotal"
import { useReportPage } from "./hooks/useReportPage"
import { column } from "./report.constant"
import type { Report, ReportsFilter } from "./report.type"

const ReportPage = () => {
  const {
    datasource,
    dataSummary,
    form,
    onReset,
    onSubmit,
    renderSchema,
    renderActiveFilter,
    onChangePagination
  } = useReportPage()

  return (
    <PageContainer
      title="Report"
      description="Track all your transactions"
    >
      <Filter.Root<ReportsFilter> onSubmit={onSubmit} form={form}>
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

      <CardTotal
        balance={dataSummary.balance}
        amount={dataSummary.amount}
        expense={dataSummary.expense}
        income={dataSummary.income}
      />

      <DataTable
        columns={column}
        dataSource={datasource.data}
        meta={{
          total: datasource.meta.total,
          page: datasource.meta.page,
          pageSize: datasource.meta.page_size,
        }}
        onChangePagination={onChangePagination}
        expandedRowRender={(record) => ExpandedRowRender<Report>({ column, record })}
      />
    </PageContainer>
  )
}

export default ReportPage