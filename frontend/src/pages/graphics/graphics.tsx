import { useFetch } from '@/hooks/useFetch'
import { PageLayout } from '@/layout/PageLayout'
import { backend, routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { GraphicsFormWithId } from './graphics.schema'
import { GraphicsForm } from './graphics.form'

export const GraphicsPage = () => {
  const { t } = useTranslation('graphics')
  const { id } = useParams()
  const title = id ? t('page.edit') : t('page.new')

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
      title={title}
      imageSrc="/banner.jpg"
      isLoading={get.isLoading}
      breadcrumb={[
        { label: t('page.title'), link: routes.graphics.index },
        { label: title }
      ]}
    >
      <GraphicsForm data={get.data} />
    </PageLayout>
  )
}
