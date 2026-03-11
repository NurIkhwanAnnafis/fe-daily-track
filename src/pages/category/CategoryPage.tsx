import { Card } from "antd"
import DataGrid from "../../components/DataTable/DataGrid"
import { Filter } from "../../components/Filter/Filter"
import PageContainer from "../../components/PageContainer/PageContainer"
import type { Category, CategoryFilter } from "./category.type"
import FormCategory from "./component/FormCategory"
import { useCategoryPage } from "./hooks/useCategoryPage"

const CategoryPage = () => {
  const {
    datasource,
    form,
    modal,
    categoryTypes,
    handleCreate,
    handleCloseModal,
    onReset,
    onSubmit,
    renderSchema,
    renderActiveFilter,
    onChangePagination,
    fetchCategory,
  } = useCategoryPage()

  return (
    <PageContainer
      title="Category"
      description="Manage and organize your spending and earning habits"
      onCreate={() => handleCreate()}
    >
      <FormCategory
        modal={modal}
        closeModal={handleCloseModal}
        onSuccess={fetchCategory}
        categoryTypes={categoryTypes}
      />

      <Filter.Root<CategoryFilter> onSubmit={onSubmit} form={form}>
        <Filter.Container>
          <div className="flex gap-2 w-full">
            {renderSchema()}
          </div>
          <div className="flex justify-end gap-2 items-end h-max">
            <Filter.Reset onReset={onReset} />
            <Filter.Submit />
          </div>
        </Filter.Container>
        {renderActiveFilter()}
      </Filter.Root>

      <DataGrid<Category>
        component={(item) => (
          <Card
            className="w-full flex items-center justify-center border-2! h-50"
          >
            <div className="flex flex-col gap-2 items-center justify-center ">
              <p className="font-semibold text-neutral-400">
                {item.name}
              </p>
            </div>
          </Card>
        )}
        createText="Add New Category"
        onCreate={() => { }}
        dataSource={datasource.data}
        componentClassName="h-50"
        meta={{
          total: datasource.meta.total,
          page: datasource.meta.page,
          pageSize: datasource.meta.page_size,
        }}
        onChangePagination={onChangePagination}
      />
    </PageContainer>
  )
}

export default CategoryPage