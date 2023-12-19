import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend, routes } from '@/routes/routes'
import { CouponsForm } from './coupons.form'
import { CouponsFormWithId } from './coupons.schema'

export const CouponsPage = () => {
  const { id, breadcrumb } = usePageUtils('coupons')

  const { get } = useFetch<CouponsFormWithId>({
    baseUrl: backend.coupons.baseUrl,
    query: ['coupons'],
    fetch: {
      id,
      get: true
    }
  })

  return (
    <PageLayout
      title={id ? 'Editar cupom' : 'Novo cupom'}
      imageSrc="/banner.jpg"
      isLoading={get.isLoading}
      breadcrumb={breadcrumb({
        segments: [{ label: 'Cupoms', link: routes.coupons.index }]
      })}
    >
      <CouponsForm data={get.data} />
    </PageLayout>
  )
}
