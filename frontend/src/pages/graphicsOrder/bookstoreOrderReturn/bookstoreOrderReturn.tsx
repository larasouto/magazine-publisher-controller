import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend, routes } from '@/routes/routes'
import { BookstoreOrderReturnsFormWithId } from './bookstoreOrderReturn.schema'
import { BookstoreOrderReturnsForm } from './bookstoreOrderReturn.form'

export const BookstoreOrderReturnsPage = () => {
  const { id, t, title, breadcrumb } = usePageUtils('bookstoreOrderReturns')

  const { get } = useFetch<BookstoreOrderReturnsFormWithId>({
    baseUrl: backend.bookstoreOrderReturn.baseUrl,
    query: ['bookstoreOrderReturns'],
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
        segments: [{ label: t('page.title'), link: routes.bookstoreOrderReturn.index }]
      })}
    >
      <BookstoreOrderReturnsForm data={get.data} />
    </PageLayout>
  )
}
