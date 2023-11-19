import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend, routes } from '@/routes/routes'
import { BookstoresFormWithId } from './bookstores.schema'
import { BookstoresForm } from './bookstores.form'

export const BookstorePage = () => {
  const { id, t, title, breadcrumb } = usePageUtils('bookstores')

  const { get } = useFetch<BookstoresFormWithId>({
    baseUrl: backend.bookstores.baseUrl,
    query: ['bookstores'],
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
        segments: [{ label: t('page.title'), link: routes.bookstores.index }]
      })}
    >
      <BookstoresForm data={get.data} />
    </PageLayout>
  )
}
