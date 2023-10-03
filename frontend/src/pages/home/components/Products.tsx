import { Loading } from '@/components/Loading'
import { useEdition } from '@/hooks/useEditions'
import { Item, useCartStore } from '@/stores/useCartStore'
import { Button, Image } from '@nextui-org/react'
import { ShoppingCart } from 'lucide-react'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'

export const Products = () => {
  const add = useCartStore((state) => state.add)
  const { list } = useEdition()

  const { data, isLoading } = useQuery<{ dto: Item[] }>(['products'], list)

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <section>
        <h1 className="text-3xl font-bold mb-7 mt-2">Magazines for you</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {data?.dto?.map((product) => (
            <div key={product.id} className="bg-default-100 rounded-lg group">
              <Image
                // src="/magazine-1.png"
                src={product.coverPath}
                className="rounded-none rounded-t-lg w-full"
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
                    toast.success(`Adicionada ${product.title} ao carrinho!`, {
                      position: 'bottom-center',
                      autoClose: 500
                    })
                    add(product)
                  }}
                >
                  <ShoppingCart className="hidden group-hover:inline-flex w-5 h-5" />
                  R$ {product.price}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h1 className="text-3xl font-bold mb-7 mt-2">
          Weekly Popular Magazines
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {data?.dto?.map((product) => (
            <div
              key={product.id}
              className="bg-default-100 dark:bg-default-100 rounded-lg group"
            >
              <Image
                // src="/magazine-1.png"
                src={product.coverPath}
                className="rounded-none rounded-t-lg w-full"
              />
              <div className="flex flex-col gap-2 p-3">
                <div className="flex items-center gap-2 justify-between">
                  <h1 className="text-lg truncate">{product.title}</h1>
                </div>
                <p className="text-sm">{product.description}</p>
                <Button
                  color="primary"
                  variant="solid"
                  className="group hover:bg-primary-700 dark:hover:bg-primary-200"
                  onClick={() => {
                    toast.success(`Adicionada ${product.title} ao carrinho!`, {
                      position: 'bottom-center',
                      autoClose: 500
                    })
                    add(product)
                  }}
                >
                  <ShoppingCart className="hidden group-hover:inline-flex w-5 h-5" />
                  R$ {product.price}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
