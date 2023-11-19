import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend, routes } from '@/routes/routes'
import { GraphicsOrdersReturnsFormWithId } from './graphicsOrderReturn.schema'
import { GraphicsOrdersReturnsForm } from './graphicsOrderReturn.form'

export const GraphicsOrdersReturnPage = () => {
  const { id, t, title, breadcrumb } = usePageUtils('graphicsOrderReturn')

  const { get } = useFetch<GraphicsOrdersReturnsFormWithId>({
    baseUrl: backend.graphicsOrderReturn.baseUrl,
    query: ['graphicsOrderReturn'],
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
        segments: [
          { label: t('page.title'), link: routes.graphicsOrderReturn.index }
        ]
      })}
    >
      <GraphicsOrdersReturnsForm data={get.data} />
    </PageLayout>
  )
}
