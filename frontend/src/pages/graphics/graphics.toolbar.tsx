import { routes } from '@/routes/routes'
import { Button, Link } from '@nextui-org/react'
import { PlusIcon } from 'lucide-react'

export const GraphicsToolbar = () => {
  return (
    <Link href={routes.graphics.new}>
      <Button color="primary" endContent={<PlusIcon />}>
        {'Nova gráfica'}
      </Button>
    </Link>
  )
}
