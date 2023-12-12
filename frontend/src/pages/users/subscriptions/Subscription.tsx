import { Format } from '@/components/ui/label/Format'
import { useFetch } from '@/hooks/useFetch'
import { useSupabase } from '@/hooks/useSupabase'
import { backend, routes } from '@/routes/routes'
import { replaceParams } from '@/utils/replace-params'
import { Button, Image, Link } from '@nextui-org/react'
import { useEffect } from 'react'

type SubscriptionProps = {
  subscriptionId: string
}

export const SubscriptionItem = ({ subscriptionId }: SubscriptionProps) => {
  const { getImage } = useSupabase()

  const { get } = useFetch<any>({
    baseUrl: backend.subscriptions.baseUrl,
    query: ['payment-subscription', subscriptionId],
    fetch: {
      id: subscriptionId,
      get: true
    }
  })

  useEffect(() => {
    console.log(get.data)
  })

  if (get.isLoading) {
    return <div>Carregando...</div>
  }

  return (
    <>
      <div className="flex gap-3">
        <Image
          src={getImage({ path: get?.data?.coverPath ?? '' })}
          width={100}
          height={100}
        />
        <div className="flex flex-col gap-1.5 max-w-lg">
          <div className="flex flex-col">
            <label className="tracking-wide text-tiny text-default-500">
              Assinatura
            </label>
            <h1 className="font-bold line-clamp-1">{get?.data?.name}</h1>
          </div>
          <div className="flex flex-col">
            <label className="tracking-wide text-tiny text-default-500">
              Descrição
            </label>
            <p className="line-clamp-2">{get?.data?.description}</p>
          </div>
          <div className="flex gap-3">
            <div>
              <label className="tracking-wide text-tiny text-default-500">
                Preço
              </label>
              <p className="line-clamp-1">
                <Format
                  text={String(get?.data?.price)}
                  size="sm"
                  type="price"
                />
              </p>
            </div>
            <div>
              <label className="tracking-wide text-tiny text-default-500">
                Status
              </label>
              <p className="line-clamp-1">{get?.data?.status}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-3 mt-5">
        <Button
          as={Link}
          color="primary"
          href={replaceParams(routes.home.subscriptions, [subscriptionId])}
        >
          Assinar novamente
        </Button>
      </div>
    </>
  )
}
