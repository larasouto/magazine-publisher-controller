import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend, routes } from '@/routes/routes'
import {  GraphocsOnDistributorsFormWithId } from './graphicsOnDistributor.schema'
import { GraphocsOnDistributorsForm } from './graphicsOnDistributor.form'

export const  GraphocsOnDistributorsPage = () => {
  const { id, t, title, breadcrumb } = usePageUtils('graphicsOnDistributor')

  const { get } = useFetch< GraphocsOnDistributorsFormWithId>({
    baseUrl: backend.graphicsOnDistributor.baseUrl,
    query: ['graphicsOnDistributor'],
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
        segments: [{ label: t('page.title'), link: routes.graphicsOnDistributor.index }]
      })}
    >
      < GraphocsOnDistributorsForm data={get.data} />
    </PageLayout>
  )
}
