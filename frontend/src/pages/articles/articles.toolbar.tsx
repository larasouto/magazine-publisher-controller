import { routes } from '@/routes/routes'
import { Button, Link } from '@nextui-org/react'
import { PlusIcon } from 'lucide-react'

export const ArticleToolbar = () => {
  return (
    <Link href={routes.articles.new}>
      <Button color="primary" endContent={<PlusIcon />}>
        {'Nova reportagem'}
      </Button>
    </Link>
  )
}
