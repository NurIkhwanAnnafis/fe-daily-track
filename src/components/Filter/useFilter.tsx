import { Fragment, useEffect, useMemo, type ReactNode } from "react"
import { DatePicker, Divider, Form, Input, Select, type FormProps } from "antd"
import type { UseFilter } from "./filter.type"
import dayjs from "dayjs"
import { parseAsIsoDateTime, parseAsJson, parseAsString, useQueryStates, type SingleParserBuilder } from "nuqs"

export const useFilter = <T extends Record<string, any>>(schema: UseFilter) => {
  const { queries, defaultValues } = useMemo(() => {
    return schema.reduce((acc, item) => {
      if (item.defaultValue) acc.defaultValues[item.name] = item.defaultValue.value

      // Handle queryConfig
      const queryConfigMap: Record<string, SingleParserBuilder<any>> = {
        'select': parseAsJson((v) => v as any),
        'date': parseAsIsoDateTime,
      }

      if (queryConfigMap?.[item.type]) {
        acc.queries[item.name] = queryConfigMap?.[item.type]
      } else {
        acc.queries[item.name] = parseAsString
      }

      return acc
    }, {
      defaultValues: {} as Record<string, any>,
      queries: {} as Record<string, any>
    })
  }, [schema])

  const [appliedFilters, setAppliedFilters] = useQueryStates(queries)
  const [form] = Form.useForm()

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
              <DatePicker placeholder={item.placeholder} className="w-full" />
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
              <Select allowClear placeholder={item.placeholder} options={item.options} labelInValue mode={item.multiple ? 'multiple' : undefined} />
            </Form.Item>
          )
      }
    })
  }

  const renderActiveFilter = () => {
    if (!Object.entries(appliedFilters).some(([, value]) => value)) return null

    return (
      <Fragment>
        <Divider />
        <div className="flex justify-between">
          <div className="flex gap-2">
            Active Filters:
            {' '}
            {Object.entries(appliedFilters).map(([key, value]) => {
              const schemaItem = schema.find((item) => item.name === key)

              if (Array.isArray(value)) {
                return (
                  <div key={`filter-${key}`} className="font-bold">
                    {schemaItem?.label}: {value.map((item) => item.label).join(', ')}
                  </div>
                )
              } else if (value) {
                if (schemaItem?.type === 'date') {
                  return (
                    <div key={`filter-${key}`} className="font-bold">
                      {schemaItem?.label}: {dayjs(value).format('DD MMM YYYY')}
                    </div>
                  )
                }

                return (
                  <div key={`filter-${key}`} className="font-bold">
                    {schemaItem?.label}: {value.label}
                  </div>
                )
              }
            })}
          </div>
          <p className="text-sm">
            latest filter: {dayjs().format('DD MMM YYYY HH:mm:ss')}
          </p>
        </div>
      </Fragment>
    )
  }

  const onSubmit: FormProps<T>['onFinish'] = (values) => {
    const hasValue = Object.entries(values).some(([, value]) => value)

    if (!hasValue) return

    setAppliedFilters(values)
  };

  const onReset = () => {
    form.resetFields()
    setAppliedFilters(null)
  }

  return {
    form,
    query: appliedFilters,
    renderSchema,
    renderActiveFilter,
    onSubmit,
    onReset,
  }
}