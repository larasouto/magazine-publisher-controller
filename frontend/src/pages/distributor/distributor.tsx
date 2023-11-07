import { useFetch } from '@/hooks/useFetch'
import { PageLayout } from '@/layout/PageLayout'
import { backend, routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { DistributorForm } from './distributor.form'
import { DistributorsFormWithId } from './distributor.schema'

export const DistributorPage = () => {
  const { t } = useTranslation('distributor')
  const { id } = useParams()
  const title = id ? t('page.edit') : t('page.new')

  const { get } = useFetch<DistributorsFormWithId>({
    baseUrl: backend.distributor.baseUrl,
    query: ['distributor'],
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
        { label: t('page.title'), link: routes.distributor.index },
        { label: title }
      ]}
    >
      <DistributorForm data={get.data} />
    </PageLayout>
  )
}
