import { EditionFormWithId } from '@/pages/editions/editions.schema'
import { useCartStore } from '@/stores/useCartStore'
import { Button } from '@nextui-org/react'
import { Minus, Plus, ShoppingCart } from 'lucide-react'

type DetailsButtonsProps = {
  data?: EditionFormWithId
}

export const DetailsButtons = ({ data }: DetailsButtonsProps) => {
  const [addItem, decrementItem, getItemQuantity, openCart] = useCartStore(
    (state) => [
      state.addItem,
      state.decrementItem,
      state.getItemQuantity,
      state.open
    ]
  )

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-2 max-w-fit">
        <Button
          color="primary"
          onClick={() => decrementItem(data?.id ?? '')}
          className="min-w-unit-7 w-unit-7 h-unit-7"
          isIconOnly
        >
          <Minus className="w-4 h-4" />
        </Button>
        {getItemQuantity(data?.id ?? '')}
        <Button
          color="primary"
          className="flex-grow min-w-unit-7 w-unit-7 h-unit-7"
          onClick={() => addItem(data)}
          isIconOnly
        >
          <Plus className="w-4 h-4" />
        </Button>
        unid.
      </div>
      <div className="flex justify-start">
        <Button
          className="font-bold"
          color="success"
          variant="faded"
          size="md"
          onClick={openCart}
          startContent={<ShoppingCart />}
        >
          Visualizar o carrinho
        </Button>
      </div>
    </div>
  )
}
