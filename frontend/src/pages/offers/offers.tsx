import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend, routes } from '@/routes/routes'
import { OffersForm } from './offers.form'
import { OffersFormWithId } from './offers.schema'

export const OffersPage = () => {
  const { id, breadcrumb } = usePageUtils('offers')

  const { get } = useFetch<OffersFormWithId>({
    baseUrl: backend.offers.baseUrl,
    query: ['offers'],
    fetch: {
      id,
      get: true
    }
  })

  return (
    <PageLayout
      title={id ? 'Editar oferta' : 'Nova oferta'}
      imageSrc="/banner.jpg"
      isLoading={get.isLoading}
      breadcrumb={breadcrumb({
        segments: [{ label: 'Ofertas', link: routes.offers.index }]
      })}
    >
      <OffersForm data={get.data} />
    </PageLayout>
  )
}
