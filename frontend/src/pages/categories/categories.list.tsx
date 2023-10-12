import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { CategoriesToolbar } from './categories.toolbar'
import { CategoryColumns, columns } from './table/categories.columns'

export const CategoryListPage = () => {
  const { t } = useTranslation('categories')
  const title = t('page.title')

  const { list } = useFetch<CategoryColumns[]>({
    baseUrl: backend.categories.baseUrl,
    query: ['categories'],
    fetch: {
      list: true
    }
  })

  return (
    <PageLayout
      title={title}
      breadcrumb={[{ label: title }]}
      isLoading={list.isLoading}
    >
      <DataTable
        columns={columns}
        data={list?.data ?? []}
        toolbarButtons={<CategoriesToolbar />}
      />
    </PageLayout>
  )
}
