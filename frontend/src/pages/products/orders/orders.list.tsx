import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { OrdersColumns, columns } from './table/orders.columns'

export const OrdersListPage = () => {
  const { breadcrumb } = usePageUtils('magazines')

  const { list } = useFetch<OrdersColumns[]>({
    baseUrl: backend.orders.baseUrl,
    query: ['orders'],
    fetch: {
      list: true
    }
  })

  return (
    <PageLayout
      title={'Lista de Pedidos'}
      isLoading={list.isLoading}
      breadcrumb={breadcrumb({
        segments: [{ label: 'Pedidos' }]
      })}
    >
      <DataTable columns={columns} data={list?.data ?? []} />
    </PageLayout>
  )
}
