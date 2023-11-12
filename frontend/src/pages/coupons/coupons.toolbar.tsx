import { routes } from '@/routes/routes'
import { Button, Link } from '@nextui-org/react'
import { PlusIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const CouponToolbar = () => {
  const { t } = useTranslation('coupons')

  return (
    <Link href={routes.coupons.new}>
      <Button color="primary" endContent={<PlusIcon />}>
        {t('page.new')}
      </Button>
    </Link>
  )
}