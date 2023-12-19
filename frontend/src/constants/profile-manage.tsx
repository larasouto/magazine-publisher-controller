import { routes } from '@/routes/routes'
import {
  Shapes,
  ShoppingBag,
  SquareAsterisk,
  Wallet,
  Warehouse
} from 'lucide-react'

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
        id: 'my-purchases',
        title: () => 'Minhas Compras',
        description: () => 'Gerencie suas compras',
        icon: <ShoppingBag className="w-5 h-5" />,
        link: routes.profile['my-purchases'].index
      },
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
      },
      {
        id: 'subscriptions',
        title: () => 'Assinaturas',
        description: () => 'Gerencie suas assinaturas',
        icon: <Shapes className="w-5 h-5" />,
        link: routes.profile['my-subscriptions'].index
      },
      {
        id: 'settings',
        title: () => 'Configurações',
        description: () => 'Gerencie suas configs',
        icon: <SquareAsterisk className="w-5 h-5" />
      }
    ]
  }
]
