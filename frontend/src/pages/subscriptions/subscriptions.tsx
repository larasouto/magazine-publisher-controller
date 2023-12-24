import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend, routes } from '@/routes/routes'
import { SubscriptionForm } from './subscriptions.form'
import { SubscriptionDataWithId } from './subscriptions.schema'

export const SubscriptionPage = () => {
  const { id, breadcrumb } = usePageUtils('subscriptions')

  const { get } = useFetch<SubscriptionDataWithId>({
    baseUrl: backend.subscriptions.baseUrl,
    query: ['subscriptions'],
    fetch: {
      id,
      get: true
    }
  })

  return (
    <PageLayout
      title={id ? 'Editar Assinatura' : 'Nova Assinatura'}
      imageSrc="/banner.jpg"
      isLoading={get.isLoading}
      breadcrumb={breadcrumb({
        segments: [{ label: 'Assinaturas', link: routes.subscriptions.index }]
      })}
    >
      <SubscriptionForm data={get.data} />
    </PageLayout>
  )
}
