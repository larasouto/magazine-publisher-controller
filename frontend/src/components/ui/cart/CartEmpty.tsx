import { Image } from '@nextui-org/react'
import { useTranslation } from 'react-i18next'

export const CartEmpty = () => {
  const { t } = useTranslation('cart')

  return (
    <div className="flex flex-col items-center justify-center gap-2 h-full">
      <Image src="/empty-cart.png" className="w-28 h-28" removeWrapper />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl">{t('cart.is_empty.label')}</h1>
        <span className="text-sm">{t('cart.is_empty.description')}</span>
      </div>
    </div>
  )
}
