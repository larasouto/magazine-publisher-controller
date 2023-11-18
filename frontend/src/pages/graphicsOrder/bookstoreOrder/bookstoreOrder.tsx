import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend, routes } from '@/routes/routes'
import { BookstoreOrdersFormWithId } from './bookstoreOrder.schema'
import { BookstoreOrdersForm } from './bookstoreOrder.form'

export const BookstoreOrdersPage = () => {
  const { id, t, title, breadcrumb } = usePageUtils('bookstoreOrders')

  const { get } = useFetch<BookstoreOrdersFormWithId>({
    baseUrl: backend.bookstoreOrders.baseUrl,
    query: ['bookstoreOrders'],
    fetch: {
      id,
      get: true
    }
  })

  return (
    <PageLayout
      title={title({ dynamic: true })}
      imageSrc="/banner.jpg"
      isLoading={get.isLoading}
      breadcrumb={breadcrumb({
        segments: [{ label: t('page.title'), link: routes.bookstoreOrders.index }]
      })}
    >
      <BookstoreOrdersForm data={get.data} />
    </PageLayout>
  )
}
