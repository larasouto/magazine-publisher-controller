import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { DistributorToolbar } from './distributor.toolbar'
import { DistributorColumns, columns } from './table/distributor.columns'

export const DistributorListPage = () => {
  const { title, breadcrumb } = usePageUtils('distributor')

  const { list } = useFetch<DistributorColumns[]>({
    baseUrl: backend.distributor.baseUrl,
    query: ['distributor'],
    fetch: {
      list: true
    }
  })

  return (
    <PageLayout
      title={title()}
      isLoading={list.isLoading}
      breadcrumb={breadcrumb()}
    >
      <DataTable
        columns={columns}
        data={list?.data ?? []}
        toolbar={<DistributorToolbar />}
      />
    </PageLayout>
  )
}
