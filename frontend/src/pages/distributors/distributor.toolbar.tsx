import { routes } from '@/routes/routes'
import { Button, Link } from '@nextui-org/react'
import { PlusIcon } from 'lucide-react'

export const DistributorToolbar = () => {
  return (
    <Link href={routes.distributors.new}>
      <Button color="primary" endContent={<PlusIcon />}>
        {'Nova distribuidora'}
      </Button>
    </Link>
  )
}
