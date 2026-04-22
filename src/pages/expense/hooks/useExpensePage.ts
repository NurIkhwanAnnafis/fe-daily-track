import { useEffect, useRef, useState } from "react"
import { parseAsString, useQueryStates } from 'nuqs'
import { useFilter } from "../../../components/Filter/useFilter"
import { createColumns } from "../expense.constant"
import { schemaFilter } from "../expense.schema"
import type { Expense, ExpenseFilter } from "../expense.type"
import type { CommonOptions, CommonResponseList } from "../../../types/common"
import { defaultResponseList } from "../../../constants/common"
import { runEffectSafe } from "../../../lib/runtime"
import { deleteExpense, getExpenses } from "../expense.service"
import { getCategories } from "../../category/category.service"
import { createParams } from "../../../utils/params"
import { message } from "antd"
import { capitalizeFirstLetter } from "../../../utils/string"
import { useBlockLoading } from "../../../store/useBlockLoading.store"
import { TRANSACTION_TYPE } from "../../../constants/transaction"
import type { FormExpenseRef } from "../component/FormExpense"

export const useExpensePage = () => {
  const [categories, setCategories] = useState<CommonOptions>([])
  const [datasource, setDatasource] = useState<CommonResponseList<Expense>>(defaultResponseList)
  const [pagination, setPagination] = useQueryStates(
    {
      page: parseAsString.withDefault('1'),
      limit: parseAsString.withDefault('10'),
    },
    {
      history: 'push',
    }
  )
  const refFormExpense = useRef<FormExpenseRef>(null)

  const {
    form,
    query,
    onReset,
    onSubmit,
    renderSchema,
    renderActiveFilter,
  } = useFilter<ExpenseFilter>(schemaFilter({ categories }))

  const { setLoading } = useBlockLoading()

  const fetchExpenses = async () => {
    setLoading(true)
    const params = {
      ...pagination,
      type: TRANSACTION_TYPE.EXPENSE,
      ...createParams(query),
    }
    const result = await runEffectSafe(getExpenses(params))

    if (!result.success) {
      setLoading(false)
      return message.error('Failed to fetch expenses')
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
    fetchExpenses()
  }, [pagination, query])

  const onChangePagination = (page: number, pageSize: number) => {
    setPagination({
      page: page.toString(),
      limit: pageSize.toString(),
    })
  }

  const handleEdit = (record: Expense) => {
    refFormExpense.current?.fetchDetail(record.id)
  }

  const handleDelete = async (record: Expense) => {
    setLoading(true)
    const result = await runEffectSafe(deleteExpense(record.id))
    setLoading(false)

    if (!result.success) return message.error('Failed to delete expense')

    message.success('Expense deleted successfully')
    fetchExpenses()
  }

  const column = createColumns({ handleEdit, handleDelete })

  return {
    datasource,
    column,
    form,
    categories,
    refFormExpense,
    handleEdit,
    handleDelete,
    onReset,
    onSubmit,
    renderSchema,
    renderActiveFilter,
    onChangePagination,
    fetchExpenses,
  }
}
