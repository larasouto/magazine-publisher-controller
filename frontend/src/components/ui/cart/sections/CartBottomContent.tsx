import { useCartStore } from '@/stores/useCartStore'
import { Button } from '@nextui-org/react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { CartTotalPrice } from '../CartTotalPrice'

export const CartBottomContent = () => {
  const { t } = useTranslation('cart')
  const items = useCartStore((state) => state.items)

  return (
    <div className="flex flex-col my-2 gap-2">
      <Button
        className="w-full text-lg"
        color="secondary"
        isDisabled={items.length === 0}
        onClick={() =>
          toast.success('Em breve!', {
            position: 'bottom-left'
          })
        }
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
