import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend, routes } from '@/routes/routes'
import { DistributorForm } from './distributor.form'
import { DistributorsFormWithId } from './distributor.schema'

export const DistributorPage = () => {
  const { id, breadcrumb } = usePageUtils('distributor')

  const { get } = useFetch<DistributorsFormWithId>({
    baseUrl: backend.distributors.baseUrl,
    query: ['distributors'],
    fetch: {
      id,
      get: true
    }
  })

  return (
    <PageLayout
      title={id ? 'Editar distribuidora' : 'Nova distribuidora'}
      imageSrc="/banner.jpg"
      isLoading={get.isLoading}
      breadcrumb={breadcrumb({
        segments: [{ label: 'Distribuidoras', link: routes.distributors.index }]
      })}
    >
      <DistributorForm data={get.data} />
    </PageLayout>
  )
}

