import { Item } from '@/stores/useCartStore'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
type Items = {
  items: Item[]
}

export const CartTotalPrice = ({ items }: Items) => {
  const { t } = useTranslation('cart')

  return (
    <>
      <span className="px-2 text-sm text-secondary font-bold">
        {t('cart.subtotal')}
      </span>
      <span>
        {new Intl.NumberFormat(i18next.language, {
          style: 'currency',
          currency: 'BRL'
        }).format(
          items.reduce((acc, item) => (acc + item.price) * item.quantity!, 0)
        )}
      </span>
    </>
  )
}
