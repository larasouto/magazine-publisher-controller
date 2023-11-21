import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { CategoriesToolbar } from './categories.toolbar'
import { CategoryColumns, columns } from './table/categories.columns'

export const CategoryListPage = () => {
  const { title, breadcrumb } = usePageUtils('categories')

  const { list, removeMany } = useFetch<CategoryColumns[]>({
    baseUrl: backend.categories.baseUrl,
    query: ['categories'],
    fetch: {
      list: true
    }
  })

  return (
    <PageLayout
      title={title()}
      breadcrumb={breadcrumb()}
      isLoading={list.isLoading}
    >
      <DataTable
        columns={columns}
        data={list?.data ?? []}
        asyncFn={removeMany.mutateAsync}
        toolbar={<CategoriesToolbar />}
      />
    </PageLayout>
  )
}
