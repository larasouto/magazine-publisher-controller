import { routes } from '@/routes/routes'
import { Button, Link } from '@nextui-org/react'
import { PlusIcon } from 'lucide-react'

export const AdvertisingToolbar = () => {
  return (
    <Link href={routes.advertisings.new}>
      <Button color="primary" endContent={<PlusIcon />}>
        {'Nova propaganda'}
      </Button>
    </Link>
  )
}
