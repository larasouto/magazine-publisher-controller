import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { BookstoreOrderReturnsColumns, columns } from './table/bookstoreOrderReturnv.columns'
import { BookstoreOrderReturnsToolbar } from './bookstoreOrderReturn.toolbar'

export const BookstoreOrderReturnsListPage = () => {
  const { title, breadcrumb } = usePageUtils('bookstoreOrderReturns')

  const { list } = useFetch<BookstoreOrderReturnsColumns[]>({
    baseUrl: backend.bookstoreOrderReturn.baseUrl,
    query: ['bookstoreOrderReturns'],
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
        toolbarButtons={<BookstoreOrderReturnsToolbar />}
      />
    </PageLayout>
  )
}
