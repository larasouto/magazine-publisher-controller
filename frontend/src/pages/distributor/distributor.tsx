import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend, routes } from '@/routes/routes'
import { DistributorForm } from './distributor.form'
import { DistributorsForm } from './distributor.schema'

export const DistributorPage = () => {
  const { id, t, title, breadcrumb } = usePageUtils('distributor')

  const { get } = useFetch<DistributorsForm>({
    baseUrl: backend.distributor.baseUrl,
    query: ['distributor'],
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
        segments: [{ label: t('page.title'), link: routes.distributor.index }]
      })}
    >
      <DistributorForm data={get.data} />
    </PageLayout>
  )
}
