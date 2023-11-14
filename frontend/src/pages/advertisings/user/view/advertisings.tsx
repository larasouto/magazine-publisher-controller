import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend, routes } from '@/routes/routes'
import { AdvertisingDataWithId } from '../advertisings.schema'
import { AdvertisingViewForm } from './advertisings.form'

export const AdvertisingViewUserPage = () => {
  const { id, breadcrumb } = usePageUtils('advertisings')

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
      title={id ? 'Visualizar Propaganda' : 'Nova Propaganda'}
      imageSrc="/banner.jpg"
      isLoading={get.isLoading}
      breadcrumb={breadcrumb({
        segments: [{ label: 'Propaganda', link: routes.advertisings.index }]
      })}
    >
      <AdvertisingViewForm data={get.data} />
    </PageLayout>
  )
}
