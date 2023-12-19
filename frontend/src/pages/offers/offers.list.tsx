import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { OffersToolbar } from './offers.toolbar'
import { OffersColumns, columns } from './table/offers.columns'

export const OffersListPage = () => {
  const { title, breadcrumb } = usePageUtils('offers')

  const { list, removeMany } = useFetch<OffersColumns[]>({
    baseUrl: backend.offers.baseUrl,
    query: ['offers'],
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
        toolbar={<OffersToolbar />}
        asyncFn={removeMany.mutateAsync}
      />
    </PageLayout>
  )
}
