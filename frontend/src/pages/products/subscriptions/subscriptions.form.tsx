import { SubmitButton } from '@/components/SubmitButton'
import { GridLayout } from '@/components/ui/Grid'
import { useFetch } from '@/hooks/useFetch'
import { backend, routes } from '@/routes/routes'
import { api } from '@/services/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Divider, Link } from '@nextui-org/react'
import { Eraser } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { AddressesSelect } from './select/orders.addresses'
import { CardsSelect } from './select/orders.cards'
import { SubscriptionsDetails } from './subscriptions.details'
import {
  PaymentSubscriptionProps,
  PaymentSubscriptionSchema
} from './subscriptions.schema'

export const SubscriptionsPayment = () => {
  const { id } = useParams()

  const form = useForm<PaymentSubscriptionProps>({
    mode: 'all',
    resolver: zodResolver(PaymentSubscriptionSchema)
  })

  useEffect(() => {
    form.setValue('subscriptionId', id ?? '')
  }, [id, form])

  const { create } = useFetch<PaymentSubscriptionProps>({
    baseUrl: backend.subscriptions.payment.baseUrl,
    query: ['subscriptions'],
    fetch: { id },
    redirectTo: routes.subscriptions.payment_list
  })

  const onSubmit = async (form: PaymentSubscriptionProps) => {
    toast.loading('Processando pedido...', { id: 'mock-payment' })

    setTimeout(async () => {
      toast.success('Pedido realizado com sucesso!', { id: 'mock-payment' })

      setTimeout(async () => {
        const { id: paymentId } = await create.mutateAsync(form)
        await api.put(`/payment-subscriptions/${paymentId}`, {
          status: Math.floor(Math.random() * 3)
        })
      }, 2000)
    }, 1000)
  }

  return (
    <>
      <SubscriptionsDetails />
      <Divider className="my-4 lg:px-36" />
      <div className="lg:px-36">
        <h1 className="text-2xl tracking-wide text-bold pt-5 pb-2 px-7">
          Confirmar Pagamento
        </h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
          noValidate
        >
          <GridLayout cols="3">
            <AddressesSelect form={form} />
            <CardsSelect form={form} />
          </GridLayout>
          <div className="flex gap-3 pt-2">
            <SubmitButton>Finalizar Compra</SubmitButton>
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
      </div>
    </>
  )
}
