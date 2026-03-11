import { Fragment, useEffect, useState, type ReactNode } from "react"
import { DatePicker, Divider, Form, Input, Select, type FormProps } from "antd"
import type { UseFilter } from "./filter.type"

export const useFilter = <T,>(schema: UseFilter) => {
  const [appliedFilters, setAppliedFilters] = useState<{
    query: T
    latest_filter: string | null
  } | null>(null)
  const [form] = Form.useForm()
  const { defaultValues } = schema.reduce((acc, item) => {
    if (item.defaultValue) acc.defaultValues[item.name] = item.defaultValue.value
    return acc
  }, {
    defaultValues: {}
  } as { defaultValues: Record<string, any> })

  useEffect(() => {
    if (Object.entries(defaultValues).length > 0) {
      form.setFieldsValue(defaultValues)
    }
  }, [defaultValues])

  const renderSchema = () => {
    return schema.map((item) => {
      switch (item.type) {
        case "text":
          return (
            <Form.Item
              key={item.id}
              label={item.label}
              name={item.name}
              className="mb-0! w-full"
            >
              <Input placeholder={item.placeholder} />
            </Form.Item>
          )
        case "date":
          return (
            <Form.Item
              key={item.id}
              label={item.label}
              name={item.name}
              className="mb-0! w-full"
            >
              <DatePicker placeholder={item.placeholder} />
            </Form.Item>
          )
        case "select":
          return (
            <Form.Item
              key={item.id}
              label={item.label}
              name={item.name}
              className="mb-0! w-full"
            >
              <Select allowClear placeholder={item.placeholder} options={item.options} />
            </Form.Item>
          )
      }
    })
  }

  const renderActiveFilter = () => {
    const values = form.getFieldsValue()

    if (Object.entries(values).length === 0 || !appliedFilters) return null

    return (
      <Fragment>
        <Divider />
        <div className="flex justify-between">
          <div className="flex gap-2">
            Active Filters:
            {' '}
            {Object.entries(values).map(([key, value]) => {
              if (value) {
                return (
                  <div key={`filter-${key}`} className="font-bold">
                    {key}: {value as ReactNode}
                  </div>
                )
              }
            })}
          </div>
          <p className="text-sm">
            latest filter:
          </p>
        </div>
      </Fragment>
    )
  }

  const onSubmit: FormProps<T>['onFinish'] = (values) => {
    setAppliedFilters({
      query: values,
      latest_filter: new Date().toISOString(),
    })
  };

  const onReset = () => {
    form.resetFields()
    setAppliedFilters(null)
  }

  return {
    form,
    query: form.getFieldsValue(),
    renderSchema,
    renderActiveFilter,
    onSubmit,
    onReset,
  }
}