import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend, routes } from '@/routes/routes'
import { AdvertisingForm } from './advertisings.form'
import { AdvertisingDataWithId } from './advertisings.schema'

export const AdvertisingPage = () => {
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
      title={id ? 'Editar Propaganda' : 'Contratar Propaganda'}
      imageSrc="/banner.jpg"
      isLoading={get.isLoading}
      breadcrumb={breadcrumb({
        segments: [{ label: 'Propaganda', link: routes.advertisings.index }]
      })}
    >
      <AdvertisingForm data={get.data} />
    </PageLayout>
  )
}
