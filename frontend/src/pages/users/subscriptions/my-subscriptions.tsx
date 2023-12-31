import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'

type SubscriptionItem = {
  id: string
  addressId: string
  cardId: string
  subscriptionId: string
}

export const MyPurchasesPage = () => {
  const { breadcrumb } = usePageUtils()

  const { list } = useFetch<SubscriptionItem[]>({
    baseUrl: backend.subscriptions.payment.baseUrl,
    query: ['payment-subscriptions'],
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
      </section>
    </PageLayout>
  )
}
