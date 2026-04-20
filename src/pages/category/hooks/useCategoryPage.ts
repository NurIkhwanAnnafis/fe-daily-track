import { useEffect, useRef, useState } from "react"
import { parseAsString, useQueryStates } from 'nuqs'
import { useFilter } from "../../../components/Filter/useFilter"
import { schemaFilter } from "../category.schema"
import type { Category, CategoryFilter } from "../category.type"
import type { CommonOptions, CommonResponseList } from "../../../types/common"
import { defaultResponseList } from "../../../constants/common"
import { runEffectSafe } from "../../../lib/runtime"
import { deleteCategory, getCategories, getCategoryType } from "../category.service"
import { createParams } from "../../../utils/params"
import { message } from "antd"
import { capitalizeFirstLetter } from "../../../utils/string"
import { useBlockLoading } from "../../../store/useBlockLoading.store"
import type { FormCategoryRef } from "../component/FormCategory"

export const useCategoryPage = () => {
  const refFormCategory = useRef<FormCategoryRef>(null)
  const [categoryTypes, setCategoryTypes] = useState<CommonOptions>([])
  const [datasource, setDatasource] = useState<CommonResponseList<Category>>(defaultResponseList)
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
    renderActiveFilter
  } = useFilter<CategoryFilter>(schemaFilter({ options: categoryTypes }))
  const { setLoading } = useBlockLoading()

  const fetchCategory = async () => {
    setLoading(true)
    const params = {
      ...pagination,
      ...createParams(query)
    }
    const result = await runEffectSafe(
      getCategories(params)
    )
    
    setLoading(false)
    if (!result.success) {
      return message.error('Get Category Error')
    }

    setDatasource(result.data)
  }

  const fetchCategoryType = async () => {
    const result = await runEffectSafe(
      getCategoryType({ page: '1', limit: '100' })
    )

    if (!result.success) {
      return message.error('Get Category Type Error')
    }

    const options = result.data.data.map((item) => ({
      value: item.id,
      label: capitalizeFirstLetter(item.name)
    }))

    setCategoryTypes(options)
  }

  const handleDelete = async (record: Category) => {
    setLoading(true)
    const result = await runEffectSafe(deleteCategory(record.id))
    
    setLoading(false)
    if (!result.success) {
      return message.error('Delete Category Error')
    }

    message.success(`Delete Category ${record.name} Success`)
    fetchCategory()
  }

  useEffect(() => {
    fetchCategoryType()
  }, [])

  useEffect(() => {
    fetchCategory()
  }, [pagination, query])

  const onChangePagination = (page: number, pageSize: number) => {
    setPagination({
      page: page.toString(),
      limit: pageSize.toString()
    })
  }

  return {
    refFormCategory,
    datasource,
    form,
    categoryTypes,
    onReset,
    onSubmit,
    renderSchema,
    renderActiveFilter,
    onChangePagination,
    fetchCategory,
    handleDelete,
  }
}