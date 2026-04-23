import { Pagination, Card } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { cx } from "../../utils/cx"

interface DataGridProps<T> {
  className?: string
  meta: {
    total: number
    page: number
    pageSize: number
  }
  component: (item: T) => React.ReactNode
  componentClassName?: string
  dataSource: T[]
  createText?: string
  onCreate: () => void
  onChangePagination: (page: number, pageSize: number) => void
}

const DataGrid = <T,>(props: DataGridProps<T>) => {
  const {
    className,
    dataSource,
    meta,
    createText = 'Add New',
    componentClassName,
    component,
    onChangePagination,
    onCreate,
  } = props
  return (
    <div className="w-full h-full flex flex-col justify-between gap-3">
      <div className="overflow-hidden">
        <div className={cx(className, 'grid grid-cols-5 gap-6')}>
          {dataSource.map((item, index) => (
            <div key={index}>
              {component(item)}
            </div>
          ))}
          <Card
            className={cx("cursor-pointer w-full flex items-center justify-center  bg-transparent! border-dashed! border-2! border-neutral-300!", componentClassName)}
            onClick={onCreate}
          >
            <div className="flex flex-col gap-2 items-center justify-center ">
              <div className="h-12 w-12 flex items-center justify-center border-2 border-neutral-300 border-dashed rounded-full">
                <PlusOutlined className="text-neutral-500!" />
              </div>
              <p className="font-semibold text-neutral-400">
                {createText}
              </p>
            </div>
          </Card>
        </div>
      </div>

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

export default DataGrid