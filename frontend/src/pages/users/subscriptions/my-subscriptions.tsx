import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { Fragment } from 'react'
import { SubscriptionsDetails } from './SubscriptionDetails'

type SubscriptionItem = {
  id: string
  addressId: string
  cardId: string
  subscriptionId: string
}

export const MySubscriptionPage = () => {
  const { breadcrumb } = usePageUtils()

  const { list } = useFetch<SubscriptionItem[]>({
    baseUrl: backend.subscriptions['my-subscriptions'].baseUrl,
    query: ['my-subscriptions'],
    fetch: {
      list: true
    }
  })

  if (list.isLoading) {
    return <div>Carregando...</div>
  }

  return (
    <PageLayout
      title="Minhas Assinaturas"
      breadcrumb={breadcrumb({
        home: { label: 'Perfil' },
        segments: [{ label: 'Minhas Assinaturas' }]
      })}
    >
      <section className="flex flex-col gap-3">
        {list.data?.length === 0 && (
          <div className="flex flex-col items-center justify-center border p-3 border-dashed rounded-lg border-foreground-300 gap-2">
            <h1 className="text-2xl font-bold">Nenhuma assinatura</h1>
            <p className="text-default-500 text-center">
              Você ainda não possui nenhuma assinatura
            </p>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {list.data?.map((subscription) => (
            <Fragment key={subscription.id}>
              <SubscriptionsDetails id={subscription.id} />
            </Fragment>
          ))}
        </div>
      </section>
    </PageLayout>
  )
}
