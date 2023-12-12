import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { Chip } from '@nextui-org/react'
import { EditionItem } from './Edition'

type OrderItem = {
  id: string
  addressId: string
  cardId: string
  orderItems: {
    editionId: string
    quantity: number
  }[]
}

export const MyPurchasesPage = () => {
  const { breadcrumb } = usePageUtils()

  const { list } = useFetch<OrderItem[]>({
    baseUrl: backend.orders.baseUrl,
    query: ['orders'],
    fetch: {
      list: true
    }
  })

  if (list.isLoading) {
    return <div>Carregando...</div>
  }

  return (
    <PageLayout
      title="Minhas Compras"
      breadcrumb={breadcrumb({
        home: { label: 'Perfil' },
        segments: [{ label: 'Minhas Compras' }]
      })}
    >
      <section className="flex flex-col gap-3">
        {list?.data?.length === 0 && (
          <div className="flex flex-col items-center justify-center border p-3 border-dashed rounded-lg border-foreground-300 gap-2">
            <h1 className="text-2xl font-bold">Nenhuma compra</h1>
            <p className="text-default-500 text-center">
              Você ainda não fez nenhuma compra
            </p>
          </div>
        )}
        {list?.data?.map((order) => (
          <div key={order.id} className="flex flex-col gap-3">
            {order.orderItems.map((item) => (
              <div
                key={item.editionId}
                className="bg-default-50 rounded-lg p-5"
              >
                <h1 className="flex justify-end">
                  <Chip size="sm">{order.id.substring(0, 8)}</Chip>
                </h1>
                <EditionItem {...item} />
              </div>
            ))}
          </div>
        ))}
      </section>
    </PageLayout>
  )
}
