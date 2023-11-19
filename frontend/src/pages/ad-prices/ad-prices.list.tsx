import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { AdPricesColumns, columns } from './table/ad-prices.columns'
import { AdPricesToolbar } from './ad-prices.toolbar'

export const AdPricesListPage = () => {
  const { title, breadcrumb } = usePageUtils('adPrices')

  const { list } = useFetch<AdPricesColumns[]>({
    baseUrl: backend.adPrices.baseUrl,
    query: ['adPrices'],
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
        toolbarButtons={<AdPricesToolbar />}
      />
    </PageLayout>
  )
}
