import { useCartStore } from '@/stores/useCartStore'
import { Button, Image } from '@nextui-org/react'
import { ShoppingCart } from 'lucide-react'
import { toast } from 'react-toastify'

const data = [
  {
    id: 1,
    name: 'Super Nature - Wild Brazil',
    description: 'Uma breve descrição da revista, com no máximo 2 linhas.',
    price: 25.99
  },
  {
    id: 2,
    name: 'Revista 2',
    description: 'Uma breve descrição da revista, com no máximo 2 linhas.',
    price: 13.49
  },
  {
    id: 3,
    name: 'Revista 3',
    description: 'Uma breve descrição da revista, com no máximo 2 linhas.',
    price: 10.99
  },
  {
    id: 4,
    name: 'Revista 4',
    description: 'Uma breve descrição da revista, com no máximo 2 linhas.',
    price: 9.99
  },
  {
    id: 5,
    name: 'Revista 5',
    description: 'Uma breve descrição da revista, com no máximo 2 linhas.',
    price: 15.99
  },
  {
    id: 6,
    name: 'Revista 6',
    description: 'Uma breve descrição da revista, com no máximo 2 linhas.',
    price: 22.99
  },
  {
    id: 7,
    name: 'Revista 7',
    description: 'Uma breve descrição da revista, com no máximo 2 linhas.',
    price: 49.99
  }
]

export const Products = () => {
  const add = useCartStore((state) => state.add)

  return (
    <>
      <section>
        <h1 className="text-3xl font-bold mb-7 mt-2">Magazines for you</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {data.map((product) => (
            <div key={product.id} className="bg-default-100 rounded-lg group">
              <Image
                src="/magazine-1.png"
                className="rounded-none rounded-t-lg w-full"
              />
              <div className="flex flex-col gap-2 p-3">
                <div className="flex items-center gap-2 justify-between">
                  <h1 className="text-lg truncate">{product.name}</h1>
                </div>
                <p className="text-sm line-clamp-2">{product.description}</p>
                <Button
                  color="primary"
                  variant="solid"
                  className="mt-2 group hover:bg-primary-700 dark:hover:bg-primary-200"
                  onClick={() => {
                    toast.success(`Adicionada ${product.name} ao carrinho!`, {
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
          {data.map((product) => (
            <div
              key={product.id}
              className="bg-default-100 dark:bg-default-100 rounded-lg group"
            >
              <Image
                src="/magazine-1.png"
                className="rounded-none rounded-t-lg w-full"
              />
              <div className="flex flex-col gap-2 p-3">
                <div className="flex items-center gap-2 justify-between">
                  <h1 className="text-lg truncate">{product.name}</h1>
                </div>
                <p className="text-sm">{product.description}</p>
                <Button
                  color="primary"
                  variant="solid"
                  className="group hover:bg-primary-700 dark:hover:bg-primary-200"
                  onClick={() => {
                    toast.success(`Adicionada ${product.name} ao carrinho!`, {
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
