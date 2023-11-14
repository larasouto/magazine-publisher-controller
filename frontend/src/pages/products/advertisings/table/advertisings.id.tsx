import { useFetch } from '@/hooks/useFetch'
import { MagazineColumns } from '@/pages/magazines/table/magazines.columns'
import { backend } from '@/routes/routes'
import { AdvertisingPaymentColumns } from './advertisings.columns'

type GetAdvertisingName = {
  row: AdvertisingPaymentColumns
}

export const GetAdvertisingName = ({ row }: GetAdvertisingName) => {
  const { get } = useFetch<MagazineColumns>({
    baseUrl: backend.advertisings.baseUrl,
    query: ['advertisings', row.advertisingId],
    fetch: {
      id: row.advertisingId,
      get: true
    }
  })

  if (get.isLoading) {
    return <span className="flex gap-2">{row.advertisingId}</span>
  }

  return (
    <span className="flex gap-2">
      {get.data?.name} - {row.advertisingId}
    </span>
  )
}
