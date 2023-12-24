import { routes } from '@/routes/routes'
import { Button, Link } from '@nextui-org/react'
import { PlusIcon } from 'lucide-react'
import { useTabs } from '../context/address.context'

export const CardsToolbar = () => {
  const { setSelected } = useTabs()

  return (
    <Link href={routes.profile.cards.new} onClick={() => setSelected('form')}>
      <Button color="primary" endContent={<PlusIcon />}>
        Novo cartão
      </Button>
    </Link>
  )
}
