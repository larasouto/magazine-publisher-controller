import { useCartStore } from '@/stores/useCartStore'
import { Button } from '@nextui-org/react'
import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const CartTopContent = () => {
  const { t } = useTranslation('cart')

  const [items, toggleOpen, reset] = useCartStore((state) => [
    state.items,
    state.toggleOpen,
    state.removeAll
  ])

  return (
    <div className="flex items-center sm:justify-between h-full">
      <div className="flex flex-grow items-center justify-between pb-7">
        <div className="flex items-center gap-3">
          <Button
            variant="flat"
            color="secondary"
            size="sm"
            radius="full"
            onClick={toggleOpen}
            className="bg-default-200 dark:bg-default-100"
            isIconOnly
          >
            <X className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl">{t('cart.title')}</h1>
        </div>
        {items.length > 0 && (
          <Button variant="light" color="secondary" onClick={reset} size="sm">
            {t('cart.clear_all')}
          </Button>
        )}
      </div>
    </div>
  )
}
