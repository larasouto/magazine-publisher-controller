import { routes } from '@/routes/routes'
import { CardsPage } from '../cards'
import { CardsListPage } from '../cards.list'

export const tabs = [
  {
    id: 'list',
    label: 'Listagem',
    content: <CardsListPage />,
    link: routes.profile.addresses.index
  },
  {
    id: 'form',
    label: 'Cadastro/Edição',
    content: <CardsPage />,
    link: routes.profile.addresses.new
  }
]
