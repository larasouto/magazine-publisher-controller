import { useCartStore } from '@/stores/useCartStore'
import { Button, Image, Tooltip } from '@nextui-org/react'
import { Minus, Plus, Trash } from 'lucide-react'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { CartEmpty } from '../CartEmpty'

export const CartItems = () => {
  const { t } = useTranslation('cart')

  const [items, decrementItem, incrementItem, removeItem] = useCartStore(
    (state) => [
      state.items,
      state.decrementItem,
      state.incrementItem,
      state.removeItem
    ]
  )

  return (
    <div className="overflow-y-hidden hover:overflow-y-auto">
      {items.length === 0 && <CartEmpty />}
      <section className="flex flex-col gap-4">
        {items?.map((item, index) => {
          return (
            <Fragment key={item.id}>
              <div className="flex items-center gap-4">
                <Image
                  src={item.coverPath}
                  radius="md"
                  className="min-w-[8rem] h-44 object-cover"
                  classNames={{ wrapper: 'w-full' }}
                />
                <div className="flex flex-grow flex-col gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-col">
                      <label className="tracking-wide text-tiny text-default-500">
                        Título
                      </label>
                      <h1 className="font-bold line-clamp-1">
                        Uma vida selvagem
                      </h1>
                    </div>
                    <div className="flex flex-col">
                      <label className="tracking-wide text-tiny text-default-500">
                        Descrição
                      </label>
                      <p className="line-clamp-2">
                        Uma descrição com bastante volume de dados, o que pode
                        ser feito?
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <Button
                        color="primary"
                        onClick={() => decrementItem(item.id)}
                        className="min-w-unit-7 w-unit-7 h-unit-7"
                        isIconOnly
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      {item?.quantity}
                      <Button
                        color="primary"
                        className="flex-grow min-w-unit-7 w-unit-7 h-unit-7"
                        onClick={() => incrementItem(item.id)}
                        isIconOnly
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                      unid.
                    </div>
                    <Tooltip color="foreground" content={t('remove_item')}>
                      <Button
                        color="danger"
                        className="flex gap-2 min-w-unit-7 w-unit-7 h-unit-7"
                        variant="solid"
                        onClick={() => removeItem(item.id)}
                        isIconOnly
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              </div>
              {index !== items.length - 1 && (
                <hr className="bg-background opacity-100 dark:opacity-20" />
              )}
            </Fragment>
          )
        })}
      </section>
    </div>
  )
}
