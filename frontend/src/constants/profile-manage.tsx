import { routes } from '@/routes/routes'
import { Wallet, Warehouse } from 'lucide-react'

type ProfileManage = {
  id: string
  title?: string
  children: {
    id: string
    title: () => string
    description: () => string
    icon?: React.ReactNode
    link?: string
  }[]
}

export const profile: ProfileManage[] = [
  {
    id: 'options',
    title: 'Opções',
    children: [
      {
        id: 'addresses',
        title: () => 'Endereços',
        description: () => 'Gerencie seus endereços',
        icon: <Warehouse className="w-5 h-5" />,
        link: routes.profile.addresses.index
      },
      {
        id: 'cards',
        title: () => 'Cartões',
        description: () => 'Gerencie seus cartões',
        icon: <Wallet className="w-5 h-5" />,
        link: routes.profile.cards.index
      }
    ]
  }
]
