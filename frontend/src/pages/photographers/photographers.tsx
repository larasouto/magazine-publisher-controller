import { useFetch } from '@/hooks/useFetch'
import { PageLayout } from '@/layout/PageLayout'
import { backend, routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { PhotographersForm } from './photographers.form'
import { PhotographerFormWithId } from './photographers.schema'

export const PhotographersPage = () => {
  const { t } = useTranslation('photographers')
  const { id } = useParams()
  const title = id ? t('page.edit') : t('page.new')

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
      title={title}
      imageSrc="/banner.jpg"
      isLoading={get.isLoading}
      breadcrumb={[
        { label: t('page.title'), link: routes.photographers.index },
        { label: title }
      ]}
    >
      <PhotographersForm data={get.data} />
    </PageLayout>
  )
}
