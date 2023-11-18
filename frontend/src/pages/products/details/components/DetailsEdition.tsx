import { Format } from '@/components/ui/label/Format'
import { EditionFormWithId } from '@/pages/editions/editions.schema'
import { useCartStore } from '@/stores/useCartStore'
import { Chip, Divider } from '@nextui-org/react'

type DetailsEditionProps = {
  data?: EditionFormWithId
}

export const DetailsEdition = ({ data }: DetailsEditionProps) => {
  const [getItemQuantity, getTotalValueItem] = useCartStore((state) => [
    state.getItemQuantity,
    state.getTotalValueItem
  ])

  return (
    <>
      <h1 className="flex flex-col text-4xl">
        <span className="text-lg text-foreground-500">Título</span>
        {data?.title}
      </h1>
      <p className="flex flex-col">
        <span className="text-lg text-foreground-500">Descrição</span>
        <span className="text-2xl">{data?.description}</span>
      </p>
      <p className="flex flex-col">
        <span className="text-lg text-foreground-500">Número da Edição</span>
        <span className="text-2xl">#{data?.number}</span>
      </p>
      <Divider />
      <div className="flex items-center flex-wrap gap-2">
        <Chip color="secondary">
          <Format
            text={String(data?.price)}
            type="price"
            className="text-white"
            noPadding
          />
        </Chip>
        <Chip color="default">
          <Format
            appendEnd={` (${getItemQuantity(data?.id)} unid.)`}
            text={String(getTotalValueItem(data?.id ?? ''))}
            type="price"
            className="text-white"
            noPadding
          />
        </Chip>
      </div>
    </>
  )
}
