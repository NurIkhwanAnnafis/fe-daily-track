import { Pagination, Table } from "antd"
import type { TableProps } from "antd"
import { useScreen } from "../../utils/screen"

interface DataTableProps<T> extends TableProps<T> {
  meta: {
    total: number
    page: number
    pageSize: number
  }
  onChangePagination: (page: number, pageSize: number) => void
  expandedRowRender?: (record: T) => React.ReactNode
}

const DataTable = <T,>({ columns, dataSource, meta, onChangePagination, expandedRowRender, ...restProps }: DataTableProps<T>) => {
  const {
    isMobile
  } = useScreen()

  return (
    <div className="w-full h-full flex flex-col justify-between gap-3">
      <Table<T>
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        expandable={{
          rowExpandable: () => isMobile,
          expandedRowRender: (record: T) => expandedRowRender?.(record),
        }}
        {...restProps}
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