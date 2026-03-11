import { Pagination, Table } from "antd"
import type { TableProps } from "antd"

interface DataTableProps<T> extends TableProps<T> {
  meta: {
    total: number
    page: number
    pageSize: number
  }
  onChangePagination: (page: number, pageSize: number) => void
}

const DataTable = <T,>({ columns, dataSource, meta, onChangePagination }: DataTableProps<T>) => {
  return (
    <div className="w-full h-full flex flex-col justify-between gap-3">
      <Table<T>
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />

      <Pagination
        total={meta.total}
        showTotal={(total) => `Total ${total} items`}
        defaultPageSize={meta.pageSize}
        defaultCurrent={meta.page}
        onChange={onChangePagination}
        align="end"
      />
    </div>
  )
}

export default DataTable