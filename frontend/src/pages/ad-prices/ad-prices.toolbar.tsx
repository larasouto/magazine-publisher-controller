import { routes } from '@/routes/routes'
import { Button, Link } from '@nextui-org/react'
import { PlusIcon } from 'lucide-react'

export const AdPricesToolbar = () => {
  return (
    <Link href={routes.adPrices.new}>
      <Button color="primary" endContent={<PlusIcon />}>
        Novo Preço de Banner
      </Button>
    </Link>
  )
}
