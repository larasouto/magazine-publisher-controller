import { routes } from '@/routes/routes'
import { Button, Link } from '@nextui-org/react'
import { PlusIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAddress } from './context/address.context'

export const CardsToolbar = () => {
  const { t } = useTranslation('cards')
  const { setSelected } = useAddress()

  return (
    <Link href={routes.profile.cards.new} onClick={() => setSelected('form')}>
      <Button color="primary" endContent={<PlusIcon />}>
        {t('page.new')}
      </Button>
    </Link>
  )
}
