import { Row, Col, Pagination, Card } from "antd"
import { PlusOutlined } from "@ant-design/icons"

interface DataGridProps<T> {
  meta: {
    total: number
    page: number
    pageSize: number
  }
  component: (item: T) => React.ReactNode
  componentClassName?: string
  gutter?: number
  span?: number
  dataSource: T[]
  createText?: string
  onCreate: () => void
  onChangePagination: (page: number, pageSize: number) => void
}

const DataGrid = <T,>(props: DataGridProps<T>) => {
  const {
    dataSource,
    meta,
    gutter = 24,
    span = 6,
    createText = 'Add New',
    componentClassName,
    component,
    onChangePagination,
    onCreate,
  } = props
  return (
    <div className="w-full h-full flex flex-col justify-between gap-3">
      <Row gutter={gutter}>
        {dataSource.map((item, index) => (
          <Col span={span} key={index}>
            {component(item)}
          </Col>
        ))}
        <Col span={span} onClick={onCreate} className="cursor-pointer">
          <Card
            className={`w-full flex items-center justify-center  bg-transparent! border-dashed! border-2! border-neutral-300! ${componentClassName}`}
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
        </Col>
      </Row>

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