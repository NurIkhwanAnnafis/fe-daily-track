import { Fragment, useEffect, useMemo } from "react"
import { DatePicker, Divider, Form, Input, Select, type FormProps } from "antd"
import type { UseFilter } from "./filter.type"
import dayjs from "dayjs"
import { createParser, parseAsIsoDateTime, parseAsString, useQueryStates, type SingleParserBuilder } from "nuqs"

const parseAsJson = createParser({
  parse(value) {
    if (!value) {
      return null
    }
    return JSON.parse(decodeURIComponent(value))
  },
  serialize(value) {
    return encodeURIComponent(JSON.stringify(value))
  },
})

export const useFilter = <T extends Record<string, any>>(schema: UseFilter) => {
  const { queries, defaultValues } = useMemo(() => {
    return schema.reduce((acc, item) => {
      if (item.defaultValue) acc.defaultValues[item.name] = item.defaultValue.value

      // Handle queryConfig
      const queryConfigMap: Record<string, SingleParserBuilder<any>> = {
        'select': parseAsJson.withDefault(null),
        'date': parseAsIsoDateTime,
      }

      if (queryConfigMap?.[item.type]) {
        acc.queries[item.name] = queryConfigMap?.[item.type]
      } else {
        acc.queries[item.name] = parseAsString.withDefault('')
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
            {Object.entries(appliedFilters).map(([key, value], index) => {
              const schemaItem = schema.find((item) => item.name === key)

              if (Array.isArray(value)) {
                return (
                  <div key={`filter-${key}`} className="font-bold">
                    {schemaItem?.label}: {value.map((item) => item.label).join(', ')}
                    {index !== Object.keys(appliedFilters).length - 1 && ', '}
                  </div>
                )
              } else if (value) {
                if (schemaItem?.type === 'date') {
                  return (
                    <div key={`filter-${key}`} className="font-bold">
                      {schemaItem?.label}: {dayjs(value).format('DD MMM YYYY')}
                      {index !== Object.keys(appliedFilters).length - 1 && ', '}
                    </div>
                  )
                }

                return (
                  <div key={`filter-${key}`} className="font-bold">
                    {schemaItem?.label}: {value.label}
                    {index !== Object.keys(appliedFilters).length - 1 && ', '}
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
    let hasValue = false, newValues: Record<string, any> = {}
    for (const key in values) {
      if (values[key]) {
        hasValue = true
      }
      newValues[key] = values[key] || null
    }

    setAppliedFilters(newValues)
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