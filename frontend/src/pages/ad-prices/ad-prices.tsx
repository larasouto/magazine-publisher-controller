import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend, routes } from '@/routes/routes'
import { AdPricesFormWithId } from './ad-prices.schema'
import { AdPricesForm } from './ad-prices.form'

export const AdPricesPage = () => {
  const { id, t, title, breadcrumb } = usePageUtils('adPrices')

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
      title={title({ dynamic: true })}
      imageSrc="/banner.jpg"
      isLoading={get.isLoading}
      breadcrumb={breadcrumb({
        segments: [{ label: t('page.title'), link: routes.adPrices.index }]
      })}
    >
      <AdPricesForm data={get.data} />
    </PageLayout>
  )
}
