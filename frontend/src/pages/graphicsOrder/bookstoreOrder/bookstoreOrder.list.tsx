import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { BookstoreOrdersColumns, columns } from './table/bookstoreOrder.columns'
import { BookstoreOrdersToolbar } from './bookstoreOrder.toolbar'

export const BookstoreOrdersListPage = () => {
  const { title, breadcrumb } = usePageUtils('bookstoreOrders')

  const { list } = useFetch<BookstoreOrdersColumns[]>({
    baseUrl: backend.bookstoreOrders.baseUrl,
    query: ['bookstoreOrders'],
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
        toolbarButtons={<BookstoreOrdersToolbar />}
      />
    </PageLayout>
  )
}
