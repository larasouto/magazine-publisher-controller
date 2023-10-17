import { useFetch } from '@/hooks/useFetch'
import { PageLayout } from '@/layout/PageLayout'
import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { AdvertisingFormWithId } from './advertisements.schema'
import { AdvertisementsForm } from './advertisements.form'

export const AdvertisementsPage = () => {
  const { t } = useTranslation('advertisements')
  const { id } = useParams()
  const title = id ? t('page.edit') : t('page.new')

  const { get } = useFetch<AdvertisingFormWithId>({
    baseUrl: routes.advertisements.index,
    query: ['advertisements'],
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
        { label: t('page.title'), link: routes.advertisements.index },
        { label: title }
      ]}
    >
      <AdvertisementsForm data={get.data} />
    </PageLayout>
  )
}
