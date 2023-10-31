import { Loading } from '@/components/Loading'
import { useFetch } from '@/hooks/useFetch'
import { SubscriptionColumns } from '@/pages/subscriptions/table/subscriptions.columns'
import { backend } from '@/routes/routes'
import { cn } from '@nextui-org/react'
import { useParams } from 'react-router-dom'

export const SubscriptionsPayment = () => {
  const { id } = useParams()

  const { get } = useFetch<SubscriptionColumns>({
    baseUrl: backend.subscriptions.baseUrl,
    query: ['subscriptions', 'payment'],
    fetch: {
      id,
      get: true
    }
  })

  if (get.isLoading) {
    return <Loading />
  }

  return (
    <div className="lg:px-36">
      <h1 className="text-3xl text-extrabold pt-5 pb-2 px-7">Assinar Plano</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7 w-full p-5">
        <div className="flex flex-col justify-between gap-6 rounded-3xl bg-default-50 p-5">
          <div className="flex flex-col gap-4">
            <h1
              className={cn('text-xl font-extrabold', {
                'text-blue-500': get.data?.type === 0,
                'text-green-600': get.data?.type === 1,
                'text-yellow-600': get.data?.type === 2
              })}
            >
              {get.data?.name}
            </h1>
            <p>{get.data?.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
