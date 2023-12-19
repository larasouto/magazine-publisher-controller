import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend, routes } from '@/routes/routes'
import { GraphicsForm } from './graphics.form'
import { GraphicsFormWithId } from './graphics.schema'

export const GraphicsPage = () => {
  const { id, breadcrumb } = usePageUtils('graphics')

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
      title={id ? 'Editar gráfica': 'Nova gráfica'}
      imageSrc="/banner.jpg"
      isLoading={get.isLoading}
      breadcrumb={breadcrumb({
        segments: [{ label: 'Gráficas', link: routes.graphics.index }]
      })}
    >
      <GraphicsForm data={get.data} />
    </PageLayout>
  )
}
