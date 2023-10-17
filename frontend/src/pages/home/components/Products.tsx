import { Loading } from '@/components/Loading'
import { useFetch } from '@/hooks/useFetch'
import { useSupabase } from '@/hooks/useSupabase'
import { CartItem, CartStore } from '@/stores/useCartStore'
import { Button, Image } from '@nextui-org/react'
import i18next from 'i18next'
import { ShoppingCart } from 'lucide-react'
import { ComponentProps } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { backend } from '../../../routes/routes'

type ProductsProps = ComponentProps<'section'>

export const Products = ({ ...props }: ProductsProps) => {
  const { t } = useTranslation('cart')
  const { getImage } = useSupabase()

  const {
    list: { data, isLoading }
  } = useFetch<CartItem[]>({
    baseUrl: backend.editions.baseUrl,
    query: ['products'],
    fetch: {
      list: true
    }
  })

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <section {...props}>
        <h1 className="text-3xl font-bold mb-7 mt-2">Magazines for you</h1>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
          {data?.map((product) => (
            <div key={product.id} className="bg-default-100 rounded-xl group">
              <Image
                src={getImage({ path: product.coverPath })}
                width={340}
                height={340}
                classNames={{
                  zoomedWrapper: 'h-64 w-full rounded-none rounded-t-xl',
                  img: 'w-full sm:h-full rounded-none object-cover hover:scale-105'
                }}
                isZoomed
              />
              <div className="flex flex-col gap-2 p-3">
                <div className="flex items-center gap-2 justify-between">
                  <h1 className="text-lg truncate">{product.title}</h1>
                </div>
                <p className="text-sm line-clamp-2">{product.description}</p>
                <Button
                  color="primary"
                  variant="solid"
                  className="mt-2 group hover:bg-primary-700 dark:hover:bg-primary-200"
                  onClick={() => {
                    toast.success(t('cart.add_to_cart'))
                    CartStore.addItem(product)
                  }}
                >
                  <ShoppingCart className="hidden group-hover:inline-flex w-5 h-5" />
                  {new Intl.NumberFormat(i18next.language, {
                    style: 'currency',
                    currency: i18next.language === 'en-US' ? 'USD' : 'BRL'
                  }).format(product.price)}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
