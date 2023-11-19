import { useFetch } from '@/hooks/useFetch'
import { MagazineColumns } from '@/pages/magazines/table/magazines.columns'
import { backend } from '@/routes/routes'
import { WalletCards } from 'lucide-react'

type GetMagazineProps = {
  id: string
}

export const GetMagazine = ({ id }: GetMagazineProps) => {
  const { get } = useFetch<MagazineColumns>({
    baseUrl: backend.magazines.baseUrl,
    query: ['magazine'],
    fetch: {
      id,
      get: true
    }
  })

  if (get.isLoading) return <WalletCards className="w-6 h-6" />

  return get.data?.name ?? 'Carregando...'
}
