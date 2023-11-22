import { routes } from '@/routes/routes'
import { Button, Link } from '@nextui-org/react'
import { PlusIcon } from 'lucide-react'

export const JobOpportunitiesToolbar = () => {
  return (
    <Link href={routes.jobOpportunities.new}>
      <Button color="primary" endContent={<PlusIcon />}>
        {'Nova vaga'}
      </Button>
    </Link>
  )
}
