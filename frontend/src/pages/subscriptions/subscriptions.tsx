import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend, routes } from '@/routes/routes'
import { SubscriptionForm } from './subscriptions.form'
import { SubscriptionDataWithId } from './subscriptions.schema'

export const SubscriptionPage = () => {
  const { id, t, title, breadcrumb } = usePageUtils('subscriptions')

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
      title={title({ dynamic: true })}
      imageSrc="/banner.jpg"
      isLoading={get.isLoading}
      breadcrumb={breadcrumb({
        segments: [{ label: t('page.title'), link: routes.subscriptions.index }]
      })}
    >
      <SubscriptionForm data={get.data} />
    </PageLayout>
  )
}
