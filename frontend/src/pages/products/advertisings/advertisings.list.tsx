import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import {
  AdvertisingPaymentColumns,
  columns
} from './table/advertisings.columns'

export const AdvertisingPaymentListPage = () => {
  const { title, breadcrumb } = usePageUtils('advertisings')

  const { list } = useFetch<AdvertisingPaymentColumns[]>({
    baseUrl: backend.advertisings.payment.baseUrl,
    query: ['advertisings-payment'],
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
      <DataTable columns={columns} data={list?.data ?? []} />
    </PageLayout>
  )
}
