import { useEffect, useState } from "react"
import { parseAsString, useQueryStates } from 'nuqs'
import { useFilter } from "../../../components/Filter/useFilter"
import { createColumns } from "../category.constant"
import { schemaFilter } from "../category.schema"
import type { Category, CategoryFilter } from "../category.type"
import type { CommonOptions, CommonResponseList } from "../../../types/common"
import { defaultResponseList } from "../../../constants/common"
import { runEffectSafe } from "../../../lib/runtime"
import { getCategories, getCategoryType } from "../category.service"
import { createParams } from "../../../utils/params"
import { message } from "antd"
import { capitalizeFirstLetter } from "../../../utils/string"
import { useBlockLoading } from "../../../store/useBlockLoading.store"

export const useCategoryPage = () => {
  const [categoryTypes, setCategoryTypes] = useState<CommonOptions>([])
  const [datasource, setDatasource] = useState<CommonResponseList<Category>>(defaultResponseList)
  const [modal, setModal] = useState<{
    open: boolean
    type: 'create' | 'edit'
    data?: Category
  }>({
    open: false,
    type: 'create'
  })
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
    console.log(params, createParams(query), query)
    const result = await runEffectSafe(
      getCategories(params)
    )

    if (!result.success) {
      return message.error('Get Category Error')
    }

    setDatasource(result.data)
    setLoading(false)
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

  const handleCloseModal = () => {
    setModal({
      open: false,
      type: 'create'
    })
  }

  const handleCreate = () => {
    setModal({
      open: true,
      type: 'create'
    })
  }

  const handleEdit = (record: Category) => {
    setModal({
      open: true,
      type: 'edit',
      data: record
    })
  }

  const handleDelete = (record: Category) => {
    console.log("Delete", record)
  }

  const column = createColumns({ handleEdit, handleDelete })

  return {
    datasource,
    column,
    form,
    modal,
    categoryTypes,
    handleCreate,
    handleEdit,
    handleDelete,
    handleCloseModal,
    onReset,
    onSubmit,
    renderSchema,
    renderActiveFilter,
    onChangePagination,
    fetchCategory,
  }
}