import { useCartStore } from '@/stores/useCartStore'
import { Button, Image } from '@nextui-org/react'
import { Minus, Plus, Trash } from 'lucide-react'

type CartItemProps = {
  id: number
  name: string
  description: string
  price: number
  quantity?: number
}

export const CartItem = (item: CartItemProps) => {
  const [add, remove, removeItem] = useCartStore((state) => [
    state.add,
    state.remove,
    state.removeItem
  ])

  return (
    <>
      <div key={item.id} className="flex gap-4">
        <Image src="/magazine-1.png" className="max-w-fit w-[100px]" />
        <div className="flex flex-col justify-center gap-2">
          <h1 className="text-lg">{item.name}</h1>
          <span className="line-clamp-2 text-sm">{item.description}</span>
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Button
                color="primary"
                onClick={() => remove(item.id)}
                className="min-w-unit-7 w-unit-7 h-unit-7"
                isIconOnly
              >
                <Minus className="w-4 h-4" />
              </Button>
              {item?.quantity}
              <Button
                color="primary"
                className="min-w-unit-7 w-unit-7 h-unit-7"
                onClick={() => add(item)}
                isIconOnly
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <Button
              color="danger"
              variant="light"
              size="sm"
              onClick={() => removeItem(item.id)}
            >
              <Trash className="w-5 h-5" />
              Remover
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
