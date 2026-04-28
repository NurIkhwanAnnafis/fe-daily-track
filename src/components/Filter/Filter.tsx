import { createContext, useContext, useState } from "react"
import { Button, Card, Drawer, Form, type FormInstance } from "antd"
import { FilterFilled, ReloadOutlined } from "@ant-design/icons"
import { LayoutContext } from "../../provider/layout.context"

type FilterContextType<T> = {
  form: FormInstance<T>
}

const FilterContext = createContext<FilterContextType<any>>({
  form: null as any,
})

const FilterFooter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex justify-between">
      {children}
    </div>
  )
}

const FilterSubmit: React.FC = () => {
  return (
    <Form.Item label={null} className="mb-0!">
      <Button
        htmlType="submit"
        type="default"
      >
        Search
      </Button>
    </Form.Item>
  )
}

const FilterReset: React.FC<{ onReset: () => void }> = ({ onReset }) => {
  return (
    <Button
      htmlType="button"
      onClick={onReset}
      type="dashed"
      icon={<ReloadOutlined />}
    >
      Reset
    </Button>
  )
}

type FilterContainerProps = {
  children: React.ReactNode
  className?: string
}
const FilterContainer: React.FC<FilterContainerProps> = ({
  children,
  className = "grid grid-cols-2 gap-4"
}) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

type FilterRootProps<T> = {
  children: React.ReactNode
  onSubmit: (values: T) => void
  form: FormInstance<T>
}
const FilterRoot = <T,>({ children, onSubmit, form }: FilterRootProps<T>) => {
  const {
    isMobile
  } = useContext(LayoutContext)
  const [open, setOpen] = useState(false)

  return (
    <FilterContext.Provider
      value={{ form }}
    >
      <div className="relative">
        {!isMobile ? (
          <Card className="border-2! p-5 bg-white space-y-4">
            <Form
              form={form}
              onFinish={onSubmit}
              name="form-filter"
              autoComplete="off"
              layout="vertical"
            >
              {children}
            </Form>
          </Card>
        ) : (
          <Drawer
            open={open}
            onClose={() => setOpen(false)}
            placement="bottom"
            title={null}
            closeIcon={null}
          >
            <Form
              form={form}
              onFinish={onSubmit}
              name="form-filter"
              autoComplete="off"
              layout="vertical"
            >
              {children}
            </Form>
          </Drawer>
        )}
      </div>
      <div className="sm:hidden fixed bottom-5 right-5 z-1060">
        <Button
          shape="circle"
          type="primary"
          icon={<FilterFilled />}
          variant="text"
          className="min-w-12! min-h-12! ring-4! ring-white"
          onClick={() => setOpen(true)}
        />
      </div>
    </FilterContext.Provider>
  )
}

export const Filter = {
  Root: FilterRoot,
  Container: FilterContainer,
  Footer: FilterFooter,
  Submit: FilterSubmit,
  Reset: FilterReset,
}