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
//import { AdvertisingsDetails } from './advertisings.details'
import { AdvertisingsDetails } from './advertisings.details'
import {
  PaymentAdvertisingProps,
  PaymentAdvertisingSchema
} from './advertisings.schema'
import { AddressesSelect } from './select/orders.addresses'
import { CardsSelect } from './select/orders.cards'

export const AdvertisingsPayment = () => {
  const { id } = useParams()

  const form = useForm<PaymentAdvertisingProps>({
    mode: 'all',
    resolver: zodResolver(PaymentAdvertisingSchema)
  })

  useEffect(() => {
    form.setValue('advertisingId', id ?? '')
  }, [id, form])

  const { create } = useFetch<PaymentAdvertisingProps>({
    baseUrl: backend.advertisings.payment.baseUrl,
    query: ['advertisings'],
    fetch: { id },
    redirectTo: routes.advertisings.payment_list
  })

  const onSubmit = async (form: PaymentAdvertisingProps) => {
    toast.loading('Processando pedido...', { id: 'mock-payment' })

    setTimeout(async () => {
      toast.success('Pedido realizado com sucesso!', { id: 'mock-payment' })

      setTimeout(async () => {
        const { id: paymentId } = await create.mutateAsync(form)
        toast.success(paymentId)
        await api.put(`/payment-advertisings/${paymentId}`, {
          status: Math.floor(Math.random() * 3)
        })
      }, 2000)
    }, 1000)
  }

  return (
    <>
      <AdvertisingsDetails />
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
