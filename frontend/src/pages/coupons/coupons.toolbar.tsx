import { routes } from '@/routes/routes'
import { Button, Link } from '@nextui-org/react'
import { PlusIcon } from 'lucide-react'

export const CouponsToolbar = () => {
  return (
    <Link href={routes.coupons.new}>
      <Button color="primary" endContent={<PlusIcon />}>
        {'Novo cupom'}
      </Button>
    </Link>
  )
}
