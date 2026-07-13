import { Pagination, Card, theme } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { cx } from "../../utils/cx"
import { useContext } from "react"
import { LayoutContext } from "../../provider/layout.context"

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

  const { isMobile, isTablet, isDesktop } = useContext(LayoutContext)
  const {
    token: { colorBorder, colorTextSecondary, colorTextTertiary },
  } = theme.useToken()

  return (
    <div className="w-full h-full flex flex-col justify-between gap-3">
      <div className="overflow-hidden">
        <div className={cx(
          className,
          {
            'grid grid-cols-2 gap-6': isMobile,
            'grid grid-cols-3 gap-6': isTablet,
            'grid grid-cols-5 gap-6': isDesktop,
          }
        )}>
          {dataSource.map((item, index) => (
            <div key={index}>
              {component(item)}
            </div>
          ))}
          <Card
            className={cx("cursor-pointer w-full flex items-center justify-center bg-transparent!", componentClassName)}
            style={{ borderStyle: 'dashed', borderWidth: 2, borderColor: colorBorder }}
            onClick={onCreate}
          >
            <div className="flex flex-col gap-2 items-center justify-center ">
              <div
                className="h-12 w-12 flex items-center justify-center rounded-full"
                style={{ borderStyle: 'dashed', borderWidth: 2, borderColor: colorBorder, color: colorTextSecondary }}
              >
                <PlusOutlined />
              </div>
              <p className="font-semibold m-0" style={{ color: colorTextTertiary }}>
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