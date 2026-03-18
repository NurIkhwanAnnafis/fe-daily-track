import { useEffect, useState } from "react"
import { parseAsString, useQueryStates } from 'nuqs'
import { useFilter } from "../../../components/Filter/useFilter"
import { createColumns } from "../income.constant"
import { schemaFilter } from "../income.schema"
import type { Income, IncomeFilter } from "../income.type"
import type { CommonOptions, CommonResponseList } from "../../../types/common"
import { defaultResponseList } from "../../../constants/common"
import { runEffectSafe } from "../../../lib/runtime"
import { getIncomes } from "../income.service"
import { getCategories } from "../../category/category.service"
import { createParams } from "../../../utils/params"
import { message } from "antd"
import { capitalizeFirstLetter } from "../../../utils/string"
import { useBlockLoading } from "../../../store/useBlockLoading.store"
import { TRANSACTION_TYPE } from "../../../constants/transaction"

export const useIncomePage = () => {
  const [categories, setCategories] = useState<CommonOptions>([])
  const [datasource, setDatasource] = useState<CommonResponseList<Income>>(defaultResponseList)
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
  } = useFilter<IncomeFilter>(schemaFilter({ categories }))

  const { setLoading } = useBlockLoading()

  const fetchIncomes = async () => {
    setLoading(true)
    const params = {
      ...pagination,
      type: TRANSACTION_TYPE.INCOME,
      ...createParams(query),
    }
    const result = await runEffectSafe(getIncomes(params))

    if (!result.success) {
      setLoading(false)
      return message.error('Failed to fetch incomes')
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
    fetchIncomes()
  }, [pagination, query])

  const onChangePagination = (page: number, pageSize: number) => {
    setPagination({
      page: page.toString(),
      limit: pageSize.toString(),
    })
  }

  const handleEdit = (record: Income) => {
    console.log('Edit', record)
  }

  const handleDelete = (record: Income) => {
    console.log('Delete', record)
  }

  const column = createColumns({ handleEdit, handleDelete })

  return {
    datasource,
    column,
    form,
    categories,
    handleEdit,
    handleDelete,
    onReset,
    onSubmit,
    renderSchema,
    renderActiveFilter,
    onChangePagination,
    fetchIncomes,
  }
}
