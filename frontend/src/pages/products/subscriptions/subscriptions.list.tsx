import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import {
  SubscriptionPaymentColumns,
  columns
} from './table/subscriptions.columns'

export const SubscriptionPaymentListPage = () => {
  const { breadcrumb } = usePageUtils('magazines')

  const { list } = useFetch<SubscriptionPaymentColumns[]>({
    baseUrl: backend.subscriptions.payment.baseUrl,
    query: ['subscriptions-payment'],
    fetch: {
      list: true
    }
  })

  return (
    <PageLayout
      title={'Pagamentos de Assinaturas'}
      isLoading={list.isLoading}
      breadcrumb={breadcrumb({
        segments: [{ label: 'Pagamentos' }]
      })}
    >
      <DataTable columns={columns} data={list?.data ?? []} />
    </PageLayout>
  )
}
