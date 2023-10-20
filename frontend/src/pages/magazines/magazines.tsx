import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend, routes } from '@/routes/routes'
import { MagazinesForm } from './magazines.form'
import { MagazineFormWithId } from './magazines.schema'

export const MagazinePage = () => {
  const { id, t, title, breadcrumb } = usePageUtils('magazines')

  const { get } = useFetch<MagazineFormWithId>({
    baseUrl: backend.magazines.baseUrl,
    query: ['magazines'],
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
        segments: [{ label: t('page.title'), link: routes.magazines.index }]
      })}
    >
      <MagazinesForm data={get.data} />
    </PageLayout>
  )
}
