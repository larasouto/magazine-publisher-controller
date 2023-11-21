import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { Chip } from '@nextui-org/react'
import { useEffect } from 'react'
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

  useEffect(() => {
    console.log(list.data)
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
        {list.data?.map((order) => (
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
