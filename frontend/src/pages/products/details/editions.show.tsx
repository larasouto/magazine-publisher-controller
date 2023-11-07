import { Format } from '@/components/ui/label/Format'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { useSupabase } from '@/hooks/useSupabase'
import { PageLayout } from '@/layout/PageLayout'
import { EditionFormWithId } from '@/pages/editions/editions.schema'
import { backend } from '@/routes/routes'
import { useCartStore } from '@/stores/useCartStore'
import { Button, Divider, Image } from '@nextui-org/react'
import { Minus, Plus } from 'lucide-react'

export const EditionShow = () => {
  const { id, title, breadcrumb } = usePageUtils('editions')
  const { getImage } = useSupabase()

  const [incrementItem, decrementItem, getItemQuantity] = useCartStore(
    (state) => [state.incrementItem, state.decrementItem, state.getItemQuantity]
  )

  const {
    get: { data, isLoading }
  } = useFetch<EditionFormWithId>({
    baseUrl: backend.editions.baseUrl,
    query: ['editions'],
    fetch: {
      id,
      get: true
    }
  })

  return (
    <PageLayout title={title()} breadcrumb={breadcrumb()} isLoading={isLoading}>
      <section className="flex flex-col gap-2">
        <div className="flex gap-32">
          <div className="flex items-center justify-center bg-default-100 rounded-xl w-96 h-96">
            <Image
              src={getImage({ path: data?.coverPath ?? '' })}
              classNames={{
                wrapper: 'w-64',
                img: 'w-full object-cover'
              }}
            />
          </div>
          <div className="flex flex-col gap-2 flex-grow">
            <h1 className="text-4xl">{data?.title}</h1>
            <p>{data?.description}</p>
            <Divider />
            <p>{<Format text={String(data?.price)} type="price" />}</p>
            <Divider />
            <div className="flex gap-2">
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
                onClick={() => incrementItem(data?.id ?? '')}
                isIconOnly
              >
                <Plus className="w-4 h-4" />
              </Button>
              unid.
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
