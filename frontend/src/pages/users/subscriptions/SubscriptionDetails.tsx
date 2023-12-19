import { Loading } from '@/components/Loading'
import { Format } from '@/components/ui/label/Format'
import { useFetch } from '@/hooks/useFetch'
import { SubscriptionColumns } from '@/pages/subscriptions/table/subscriptions.columns'
import { backend } from '@/routes/routes'
import { Chip, cn } from '@nextui-org/react'

type SubscriptionsDetailsProps = {
  id: string
}

export const SubscriptionsDetails = ({ id }: SubscriptionsDetailsProps) => {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7 w-full">
      <div className="flex flex-col justify-between gap-6 rounded-3xl bg-default-50 p-5">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1
              className={cn('text-xl font-extrabold', {
                'text-blue-500': Number(get.data?.type) === 0,
                'text-green-600': Number(get.data?.type) === 1,
                'text-yellow-600': Number(get.data?.type) === 2
              })}
            >
              {get.data?.name}
            </h1>
          </div>
          <p>{get.data?.description}</p>
          <Chip
            size="md"
            color={
              cn({
                primary: Number(get.data?.type) === 0,
                success: Number(get.data?.type) === 1,
                warning: Number(get.data?.type) === 2
              }) as any
            }
            variant="bordered"
          >
            <Format
              text={String(get.data?.price)}
              type="price"
              className="pb-0 text-small"
            />
          </Chip>
        </div>
      </div>
    </div>
  )
}
