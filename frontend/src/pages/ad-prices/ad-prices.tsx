import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend, routes } from '@/routes/routes'
import { AdPricesForm } from './ad-prices.form'
import { AdPricesFormWithId } from './ad-prices.schema'

export const AdPricesPage = () => {
  const { id, breadcrumb } = usePageUtils('adPrices')

  const { get } = useFetch<AdPricesFormWithId>({
    baseUrl: backend.adPrices.baseUrl,
    query: ['adPrices'],
    fetch: {
      id,
      get: true
    }
  })

  return (
    <PageLayout
      title={id ? 'Editar de Preço do Banner' : 'Novo Preço do Banner'}
      imageSrc="/banner.jpg"
      isLoading={get.isLoading}
      breadcrumb={breadcrumb({
        segments: [{ label: 'Preços', link: routes.adPrices.index }]
      })}
    >
      <AdPricesForm data={get.data} />
    </PageLayout>
  )
}
