import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend, routes } from '@/routes/routes'
import { GraphicsOrdersFormWithId } from './graphicsOrders.schema'
import { GraphicsOrdersForm } from './graphicsOrders.form'


export const GraphicsOrdersPage = () => {
  const { id, t, title, breadcrumb } = usePageUtils('graphicsOrder')

  const { get } = useFetch<GraphicsOrdersFormWithId>({
    baseUrl: backend.graphicsOrders.baseUrl,
    query: ['graphicsOrders'],
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
        segments: [{ label: t('page.title'), link: routes.graphicsOrders.index }]
      })}
    >
      <GraphicsOrdersForm data={get.data} />
    </PageLayout>
  )
}
