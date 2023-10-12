import { useFetch } from '@/hooks/useFetch'
import { PageLayout } from '@/layout/PageLayout'
import { backend, routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { ReportersForm } from './reporters.form'
import { ReporterFormWithId } from './reporters.schema'

export const ReportersPage = () => {
  const { t } = useTranslation('reporters')
  const { id } = useParams()

  const { get } = useFetch<ReporterFormWithId>({
    baseUrl: backend.reporters.baseUrl,
    query: ['reporters'],
    fetch: {
      id,
      get: true
    }
  })

  const title = id ? t('page.edit') : t('page.new')

  return (
    <PageLayout
      title={title}
      imageSrc="/banner.jpg"
      isLoading={get.isLoading}
      breadcrumb={[
        { label: t('page.title'), link: routes.reporters.index },
        { label: title }
      ]}
    >
      <ReportersForm data={get.data} />
    </PageLayout>
  )
}
