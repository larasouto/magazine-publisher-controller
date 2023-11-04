import { routes } from '@/routes/routes'
import { AddressesPage } from '../addresses'
import { AddressesListPage } from '../addresses.list'

export const tabs = [
  {
    id: 'list',
    label: 'Listagem',
    content: <AddressesListPage />,
    link: routes.profile.addresses.index
  },
  {
    id: 'form',
    label: 'Cadastro/Edição',
    content: <AddressesPage />,
    link: routes.profile.addresses.new
  }
]
