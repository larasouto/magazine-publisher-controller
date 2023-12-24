import { useFetch } from '@/hooks/useFetch'
import { MagazineColumns } from '@/pages/magazines/table/magazines.columns'
import { backend } from '@/routes/routes'
import { SubscriptionPaymentColumns } from './subscriptions.columns'

type GetSubscriptionName = {
  row: SubscriptionPaymentColumns
}

export const GetSubscriptionName = ({ row }: GetSubscriptionName) => {
  const { get } = useFetch<MagazineColumns>({
    baseUrl: backend.subscriptions.baseUrl,
    query: ['subscriptions', row.subscriptionId],
    fetch: {
      id: row.subscriptionId,
      get: true
    }
  })

  if (get.isLoading) {
    return <span className="flex gap-2">{row.subscriptionId}</span>
  }

  return <span className="flex gap-2">{get.data?.name}</span>
}
