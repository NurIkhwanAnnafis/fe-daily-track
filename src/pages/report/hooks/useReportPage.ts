import { useEffect, useState } from "react"
import { useFilter } from "../../../components/Filter/useFilter"
import type { CommonOptions, CommonResponseList } from "../../../types/common"
import { schemaFilter } from "../report.schema"
import type { ReportsFilter, Report } from "../report.type"
import { runEffectSafe } from "../../../lib/runtime"
import { getCategories } from "../../../services/category.service"
import { capitalizeFirstLetter } from "../../../utils/string"
import { defaultResponseList } from "../../../constants/common"
import { parseAsString, useQueryStates } from "nuqs"
import { useBlockLoading } from "../../../store/useBlockLoading.store"
import { createParams } from "../../../utils/params"
import { getReports } from "../report.service"
import { message } from "antd"

export const useReportPage = () => {
  const [categories, setCategories] = useState<CommonOptions>([])
  const [datasource, setDatasource] = useState<CommonResponseList<Report>>(defaultResponseList)
  const [pagination, setPagination] = useQueryStates(
    {
      page: parseAsString.withDefault('1'),
      limit: parseAsString.withDefault('10'),
    },
    {
      history: 'push',
    }
  )
  const {
    form,
    query,
    onReset,
    onSubmit,
    renderSchema,
    renderActiveFilter,
  } = useFilter<ReportsFilter>(schemaFilter({ categories }))

  const { setLoading } = useBlockLoading()

  const fetchReports = async () => {
    setLoading(true)
    const params = {
      ...pagination,
      ...createParams(query),
    }
    const result = await runEffectSafe(getReports(params))

    if (!result.success) {
      setLoading(false)
      return message.error('Failed to fetch reports')
    }

    setDatasource(result.data)
    setLoading(false)
  }

  const fetchCategories = async () => {
    const result = await runEffectSafe(
      getCategories({ page: '1', limit: '100', search: '' })
    )

    if (!result.success) return

    const options = result.data.data.map((item) => ({
      value: item.id,
      label: capitalizeFirstLetter(item.name),
    }))

    setCategories(options)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchReports()
  }, [pagination, query])

  const onChangePagination = (page: number, pageSize: number) => {
    setPagination({
      page: page.toString(),
      limit: pageSize.toString(),
    })
  }

  return {
    datasource,
    form,
    onReset,
    onSubmit,
    renderSchema,
    renderActiveFilter,
    onChangePagination
  }
}