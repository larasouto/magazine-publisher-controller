import { routes } from '@/routes/routes'
import { CartStore, useCartStore } from '@/stores/useCartStore'
import { Button } from '@nextui-org/react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { CartTotalPrice } from '../CartTotalPrice'

export const CartBottomContent = () => {
  const { t } = useTranslation('cart')
  const items = useCartStore((state) => state.items)
  const navigate = useNavigate()

  return (
    <div className="flex flex-col my-2 gap-2 px-5">
      <Button
        className="w-full text-lg"
        color="secondary"
        isDisabled={items.length === 0}
        href={routes.orders.index}
        onClick={() => {
          setTimeout(() => {
            navigate(routes.orders.index)
          }, 500)
          CartStore.close()
        }}
      >
        {t('cart.checkout')}
      </Button>
      <div className="flex justify-end">
        <h3 className="text-lg">
          <CartTotalPrice items={items} />
        </h3>
      </div>
    </div>
  )
}
