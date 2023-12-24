import { routes } from '@/routes/routes'
import { Button, Link } from '@nextui-org/react'
import { PlusIcon } from 'lucide-react'

export const OffersToolbar = () => {
  return (
    <Link href={routes.offers.new}>
      <Button color="primary" endContent={<PlusIcon />}>
        {'Nova oferta'}
      </Button>
    </Link>
  )
}
