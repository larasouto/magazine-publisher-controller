import { SubmitButton } from '@/components/SubmitButton'
import { GridLayout } from '@/components/ui/Grid'
import { useFetch } from '@/hooks/useFetch'
import { backend, routes } from '@/routes/routes'
import { CartStore } from '@/stores/useCartStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Link, cn } from '@nextui-org/react'
import { Eraser } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { OrdersItems } from './items/orders.items'
import {
  OrderSchema,
  OrderStatus,
  OrdersData,
  OrdersDataWithId
} from './orders.schema'
import { AddressesSelect } from './select/orders.addresses'
import { CardsSelect } from './select/orders.cards'

type MagazinesFormProps = {
  data?: OrdersDataWithId
}

export const OrdersForm = ({ data }: MagazinesFormProps) => {
  const { create } = useFetch<OrdersData>({
    baseUrl: backend.orders.baseUrl,
    query: ['orders'],
    fetch: {
      id: data?.id
    }
  })

  const form = useForm<OrdersData>({
    mode: 'all',
    resolver: zodResolver(OrderSchema),
    defaultValues: data
  })

  useEffect(() => {
    form.setValue('status', OrderStatus.PENDING)
    form.setValue(
      'items',
      CartStore.items().map((item) => ({
        editionId: item.id,
        quantity: item.quantity ?? 1
      }))
    )
    form.setValue('totalValue', CartStore.getTotalValue())
  }, [form])

  const onSubmit = async (_form: OrdersData) => {
    await create.mutateAsync(_form)
    console.table(_form)
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-3"
      noValidate
    >
      <OrdersItems />
      <GridLayout cols="3">
        <AddressesSelect form={form} />
        <CardsSelect form={form} />
      </GridLayout>
      <div className="flex gap-3 pt-2">
        <SubmitButton
          className={cn('animate-pulse bg-secondary-400', {
            'cursor-not-allowed': CartStore.items().length === 0
          })}
          isDisabled={CartStore.items().length === 0}
        >
          Finalizar Compra
        </SubmitButton>
        <div className="flex gap-2.5 mt-2.5">
          <Button
            color="default"
            type="button"
            as={Link}
            href={routes.home.index}
          >
            {<Eraser className="w-5 h-5" />}
            Voltar para a loja
          </Button>
        </div>
      </div>
    </form>
  )
}
