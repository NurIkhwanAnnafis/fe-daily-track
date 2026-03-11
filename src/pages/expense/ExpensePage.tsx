import DataTable from "../../components/DataTable/DataTable"
import PageContainer from "../../components/PageContainer/PageContainer"
import { createColumns } from "./expense.constant"
import type { Expense } from "./expense.type"

const Expense = () => {
  const handleEdit = (record: Expense) => {
    console.log("Edit", record)
  }

  const handleDelete = (record: Expense) => {
    console.log("Delete", record)
  }

  const column = createColumns({ handleEdit, handleDelete })

  return (
    <PageContainer title="Expense" onCreate={() => { }}>
      <DataTable
        columns={column}
        dataSource={[]}
        meta={{
          total: 0,
          page: 1,
          pageSize: 10,
        }}
        onChangePagination={() => { }}
      />
    </PageContainer>
  )
}

export default Expense