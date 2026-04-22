import { useEffect, useRef, useState } from "react"
import { parseAsString, useQueryStates } from 'nuqs'
import { useFilter } from "../../../components/Filter/useFilter"
import { createColumns } from "../income.constant"
import { schemaFilter } from "../income.schema"
import type { Income, IncomeFilter } from "../income.type"
import type { CommonOptions, CommonResponseList } from "../../../types/common"
import { defaultResponseList } from "../../../constants/common"
import { runEffectSafe } from "../../../lib/runtime"
import { deleteIncome, getIncomes } from "../income.service"
import { getCategories } from "../../category/category.service"
import { createParams } from "../../../utils/params"
import { message } from "antd"
import { capitalizeFirstLetter } from "../../../utils/string"
import { useBlockLoading } from "../../../store/useBlockLoading.store"
import { TRANSACTION_TYPE } from "../../../constants/transaction"
import type { FormIncomeRef } from "../component/FormIncome"

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
  const refFormIncome = useRef<FormIncomeRef>(null)

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
    refFormIncome.current?.fetchDetail(record.id)
  }

  const handleDelete = async (record: Income) => {
      setLoading(true)
      const result = await runEffectSafe(deleteIncome(record.id))
      setLoading(false)
  
      if (!result.success) return message.error('Failed to delete income')
  
      message.success('Income deleted successfully')
      fetchIncomes()
    }

  const column = createColumns({ handleEdit, handleDelete })

  return {
    datasource,
    column,
    form,
    categories,
    refFormIncome,
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
