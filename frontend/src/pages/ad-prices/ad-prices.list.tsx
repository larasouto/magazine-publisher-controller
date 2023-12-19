import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { AdPricesToolbar } from './ad-prices.toolbar'
import { AdPricesColumns, columns } from './table/ad-prices.columns'

export const AdPricesListPage = () => {
  const { breadcrumb } = usePageUtils('adPrices')

  const { list } = useFetch<AdPricesColumns[]>({
    baseUrl: backend.adPrices.baseUrl,
    query: ['adPrices'],
    fetch: {
      list: true
    }
  })

  return (
    <PageLayout
      title={'Preços'}
      isLoading={list.isLoading}
      breadcrumb={breadcrumb({
        segments: [{ label: 'Preços' }]
      })}
    >
      <DataTable
        columns={columns}
        data={list?.data ?? []}
        toolbar={<AdPricesToolbar />}
      />
    </PageLayout>
  )
}
