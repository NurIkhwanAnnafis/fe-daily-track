import { createContext, useContext } from "react"
import { Button, Form, type FormInstance } from "antd"
import { ReloadOutlined } from "@ant-design/icons"

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
      type="text"
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

  return (
    <FilterContext.Provider
      value={{ form }}
    >
      <div className="relative">
        <div className="group p-5 bg-white space-y-4">
          <Form
            form={form}
            onFinish={onSubmit}
            name="form-filter"
            autoComplete="off"
            layout="vertical"
          >
            {children}
          </Form>
        </div>
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