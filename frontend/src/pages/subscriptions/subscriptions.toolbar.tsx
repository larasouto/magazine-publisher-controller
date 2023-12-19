import { routes } from '@/routes/routes'
import { Button, Link } from '@nextui-org/react'
import { PlusIcon } from 'lucide-react'

export const SubscriptionToolbar = () => {
  return (
    <Link href={routes.subscriptions.new}>
      <Button color="primary" endContent={<PlusIcon />}>
        Nova Assinatura
      </Button>
    </Link>
  )
}
