import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { DistributorToolbar } from './distributor.toolbar'
import { DistributorsColumns, columns } from './table/distributor.columns'

export const DistributorListPage = () => {
  const { t } = useTranslation('distributor')
  const title = t('page.title')

  const { list } = useFetch<DistributorsColumns[]>({
    baseUrl: backend.distributor.baseUrl,
    query: ['distributor'],
    fetch: {
      list: true
    }
  })

  return (
    <PageLayout
      title={title}
      isLoading={list.isLoading}
      breadcrumb={[{ label: title }]}
    >
      <DataTable
        columns={columns}
        data={list?.data ?? []}
        toolbarButtons={<DistributorToolbar />}
      />
    </PageLayout>
  )
}
