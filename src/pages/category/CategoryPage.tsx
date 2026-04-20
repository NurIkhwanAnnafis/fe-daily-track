import dayjs from "dayjs"
import { Card, Dropdown, Tag } from "antd"
import { FileImageOutlined, MoreOutlined } from "@ant-design/icons"
import DataGrid from "../../components/DataTable/DataGrid"
import { Filter } from "../../components/Filter/Filter"
import PageContainer from "../../components/PageContainer/PageContainer"
import type { Category, CategoryFilter } from "./category.type"
import FormCategory from "./component/FormCategory"
import { useCategoryPage } from "./hooks/useCategoryPage"
import { colorMap } from "./category.constant"
import PopupConfirm from "../../components/Popup/PopupConfirm"

const CategoryPage = () => {
  const {
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
  } = useCategoryPage()

  const items = (item: Category) => [
    {
      key: '1',
      label: (
        <a onClick={(e) => refFormCategory.current?.fetchDetail(item.id)}>
          Edit
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <PopupConfirm
          title="Delete the Category"
          description={`Are you sure to delete Category ${item.name}?`}
          onConfirm={() => handleDelete(item)}
          okText="Yes"
          cancelText="No"
        >
          <a onClick={(e) => e.preventDefault()} className="text-red-500!">
            Delete
          </a>
        </PopupConfirm>
      ),
    },
  ]

  return (
    <PageContainer
      title="Category"
      description="Manage and organize your spending and earning habits"
      onCreate={() => refFormCategory.current?.handleCreate()}
    >
      <FormCategory
        ref={refFormCategory}
        onSuccess={fetchCategory}
        categoryTypes={categoryTypes}
      />

      <Filter.Root<CategoryFilter> onSubmit={onSubmit} form={form}>
        <Filter.Container>
          <div className="flex gap-2 w-full">
            {renderSchema()}
          </div>
          <div className="flex justify-end gap-2 items-end h-full">
            <div className="flex gap-4">
              <Filter.Reset onReset={onReset} />
              <span className="h-auto w-px bg-neutral-300" />
              <Filter.Submit />
            </div>
          </div>
        </Filter.Container>
        {renderActiveFilter()}
      </Filter.Root>

      <DataGrid<Category>
        gutter={[16, 16]}
        span={4}
        component={(item) => (
          <Card
            className="w-full border-2! h-50"
            classNames={{
              body: 'flex justify-between flex-col h-full'
            }}
          >
            <div className="flex justify-between">
              {item.logo ? (
                <img src={item.logo} alt={item.name} className="w-15 h-15" />
              ) : <FileImageOutlined className="text-5xl!" style={{ color: item.color ?? '#9ca3af' }} />}
              <Dropdown menu={{ items: items(item) }} trigger={['click']}>
                <MoreOutlined className="text-2xl! cursor-pointer" />
              </Dropdown>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-neutral-950 mb-0!">
                {item.name}
              </p>
              <div className="flex gap-2">
                {item.category_types.map((type) => (
                  <Tag key={type} color={colorMap[type as keyof typeof colorMap]}>{type}</Tag>
                ))}
              </div>
            </div>
            <div>
              <p className="font-semibold text-neutral-400">
                {dayjs(item.created_at).format('DD MMM YYYY')}
              </p>
            </div>
          </Card>
        )}
        createText="Add New Category"
        onCreate={() => refFormCategory.current?.handleCreate()}
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