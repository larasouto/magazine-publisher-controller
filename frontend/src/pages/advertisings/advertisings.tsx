import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend, routes } from '@/routes/routes'
import { AdvertisingForm } from './advertisings.form'
import { AdvertisingDataWithId } from './advertisings.schema'

export const AdvertisingPage = () => {
  const { id, t, title, breadcrumb } = usePageUtils('advertisings')

  const { get } = useFetch<AdvertisingDataWithId>({
    baseUrl: backend.advertisings.baseUrl,
    query: ['advertisings'],
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
        segments: [{ label: t('page.title'), link: routes.advertisings.index }]
      })}
    >
      <AdvertisingForm data={get.data} />
    </PageLayout>
  )
}
