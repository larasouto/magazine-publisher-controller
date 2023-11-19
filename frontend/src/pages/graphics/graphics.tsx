import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend, routes } from '@/routes/routes'
import { GraphicsFormWithId } from './graphics.schema'
import { GraphicsForm } from './graphics.form'

export const GraphicsPage = () => {
  const { id, t, title, breadcrumb } = usePageUtils('graphics')

  const { get } = useFetch<GraphicsFormWithId>({
    baseUrl: backend.graphics.baseUrl,
    query: ['graphics'],
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
        segments: [{ label: t('page.title'), link: routes.graphics.index }]
      })}
    >
      <GraphicsForm data={get.data} />
    </PageLayout>
  )
}
