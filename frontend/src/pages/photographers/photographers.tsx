import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend, routes } from '@/routes/routes'
import { PhotographersForm } from './photographers.form'
import { PhotographerFormWithId } from './photographers.schema'

export const PhotographersPage = () => {
  const { id, t, title, breadcrumb } = usePageUtils('photographers')

  const { get } = useFetch<PhotographerFormWithId>({
    baseUrl: backend.photographers.baseUrl,
    query: ['photographers'],
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
        segments: [{ label: t('page.title'), link: routes.photographers.index }]
      })}
    >
      <PhotographersForm data={get.data} />
    </PageLayout>
  )
}
