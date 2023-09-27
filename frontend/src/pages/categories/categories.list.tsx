import { Loading } from '@/components/Loading'
import { DataTable } from '@/components/table/DataTable'
import { useCategory } from '@/hooks/useCategory'
import { PageLayout } from '@/layout/PageLayout'
import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { CategoriesToolbar } from './categories.toolbar'
import { CategoryColumns, columns } from './table/categories.columns'

export const CategoryListPage = () => {
  const { t } = useTranslation('categories')
  const title = t('page.title')
  const breadcrumb = [{ label: title }]
  const navigate = useNavigate()
  const { list } = useCategory()

  const { data, isLoading, isError } = useQuery<{ dto: CategoryColumns[] }>(
    ['categories'],
    list
  )

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    navigate(routes.categories.index)
  }

  return (
    <PageLayout title={title} breadcrumb={breadcrumb}>
      <DataTable
        columns={columns}
        data={data?.dto ?? []}
        toolbarButtons={<CategoriesToolbar />}
      />
    </PageLayout>
  )
}
