import { Loading } from '@/components/Loading'
import { useFetch } from '@/hooks/useFetch'
import { useSupabase } from '@/hooks/useSupabase'
import { CartItem, CartStore } from '@/stores/useCartStore'
import { replaceParams } from '@/utils/replace-params'
import { Button, Chip, Image, Input } from '@nextui-org/react'
import i18next from 'i18next'
import { Search, ShoppingCart } from 'lucide-react'
import { ComponentProps, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { backend, routes } from '../../../routes/routes'

type ProductsProps = ComponentProps<'section'>

export const Products = ({ ...props }: ProductsProps) => {
  const { t } = useTranslation('cart')
  const { getImage } = useSupabase()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const {
    list: { data, isLoading }
  } = useFetch<CartItem[]>({
    baseUrl: backend.editions.baseUrl,
    query: ['products'],
    fetch: {
      list: true
    }
  })

  useEffect(() => {
    console.log(data)
  })

  if (isLoading) {
    return <Loading />
  }

  if (!Array.isArray(data)) {
    return null
  }

  const filtered =
    search.length > 0
      ? data.filter((product) =>
          product.title.toLowerCase().includes(search.toLowerCase())
        )
      : data

  return (
    <>
      <section {...props}>
        <h1 className="text-3xl font-bold mb-4 mt-2">Revistas para você</h1>
        <Input
          placeholder="Pesquisar"
          labelPlacement="outside"
          startContent={<Search className="w-5 h-5" />}
          value={search}
          onValueChange={setSearch}
          classNames={{ input: 'min-w-full sm:min-w-[420px]', base: 'mb-6' }}
        />
        {filtered?.length === 0 && (
          <div className="flex flex-col items-center justify-center border p-3 border-dashed rounded-lg border-foreground-300 gap-2">
            <h1 className="text-2xl font-bold">Nenhum produto encontrado</h1>
            <p className="text-sm text-gray-500">
              {data.length === 0
                ? 'Nenhum produto foi identificado no sistema'
                : 'Verifique se o termo pesquisado está correto'}
            </p>
          </div>
        )}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
          {filtered?.map((product) => (
            <div key={product.id} className="bg-default-100 rounded-xl group">
              <div className="relative">
                <Image
                  src={getImage({ path: product.coverPath })}
                  width={340}
                  height={340}
                  classNames={{
                    zoomedWrapper: 'h-64 w-full rounded-none rounded-t-xl',
                    img: 'w-full sm:h-full rounded-none object-cover hover:scale-105 hover:cursor-pointer'
                  }}
                  isZoomed
                  onClick={() =>
                    navigate(replaceParams(routes.home.editions, [product.id]))
                  }
                />
                {product.isTopSeller && (
                  <Chip
                    color="danger"
                    variant="solid"
                    size="sm"
                    className="absolute z-50 top-2 right-2"
                  >
                    Mais vendidas
                  </Chip>
                )}
              </div>
              <div className="flex flex-col justify-between min-h-[170px] gap-2 p-3">
                <div className="flex flex-col gap-2 justify-between">
                  <h1 className="text-lg truncate">{product.title}</h1>
                  <p className="text-sm line-clamp-2">{product.description}</p>
                </div>
                <Button
                  color="primary"
                  variant="solid"
                  className="mt-2 group hover:bg-primary-700 dark:hover:bg-primary-200"
                  onClick={() => {
                    toast.success(t('cart.add_to_cart'), {
                      id: product.id
                    })
                    CartStore.addItem(product)
                  }}
                >
                  <ShoppingCart className="hidden group-hover:inline-flex w-5 h-5" />
                  {new Intl.NumberFormat(i18next.language, {
                    style: 'currency',
                    currency: 'BRL'
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
