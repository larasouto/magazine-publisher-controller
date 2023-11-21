import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { BookstoresToolbar } from './bookstores.toolbar'
import { BookstoresColumns, columns } from './table/bookstores.columns'

export const BookstoresListPage = () => {
  const { title, breadcrumb } = usePageUtils('bookstores')

  const { list } = useFetch<BookstoresColumns[]>({
    baseUrl: backend.bookstores.baseUrl,
    query: ['bookstores'],
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
        toolbar={<BookstoresToolbar />}
      />
    </PageLayout>
  )
}
