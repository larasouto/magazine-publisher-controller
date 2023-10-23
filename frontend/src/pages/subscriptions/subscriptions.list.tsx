import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { SubscriptionToolbar } from './subscriptions.toolbar'
import { SubscriptionColumns, columns } from './table/subscriptions.columns'

export const SubscriptionsListPage = () => {
  const { title, breadcrumb } = usePageUtils('subscriptions')

  const { list } = useFetch<SubscriptionColumns[]>({
    baseUrl: backend.subscriptions.baseUrl,
    query: ['subscriptions'],
    fetch: {
      list: true
    }
  })

  console.log(list.data)

  return (
    <PageLayout
      title={title()}
      isLoading={list.isLoading}
      breadcrumb={breadcrumb()}
    >
      <DataTable
        columns={columns}
        data={list?.data ?? []}
        toolbarButtons={<SubscriptionToolbar />}
      />
    </PageLayout>
  )
}
