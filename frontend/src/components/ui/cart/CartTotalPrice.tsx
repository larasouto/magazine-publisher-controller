import { Item } from '@/stores/useCartStore'
import i18next from 'i18next'
type Items = {
  items: Item[]
}

export const CartTotalPrice = ({ items }: Items) => {
  const currencyType = i18next.language === 'pt-BR' ? 'BRL' : 'USD'

  return (
    <>
      <span className="text-sm text-secondary font-bold">Subtotal: </span>
      <span>
        {new Intl.NumberFormat(i18next.language, {
          style: 'currency',
          currency: currencyType
        }).format(
          items.reduce(
            (acc, item) => (acc + item.price) * (item.quantity ?? 1),
            0
          )
        )}
      </span>
    </>
  )
}
