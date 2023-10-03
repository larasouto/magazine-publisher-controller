import { useCartStore } from '@/stores/useCartStore'
import { Button, Image } from '@nextui-org/react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Fragment, useEffect } from 'react'
import { cn } from '../../lib/utils'
import { CartItem } from './CartItem'
import { CartTotalPrice } from './CartTotalPrice'

export const Cart = () => {
  const [isOpen, close, toggleOpen, items, reset] = useCartStore((state) => [
    state.isOpen,
    state.close,
    state.toggleOpen,
    state.items,
    state.reset
  ])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        toggleOpen()
      }
    }

    const escape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
      }
    }

    document.addEventListener('keydown', down)
    document.addEventListener('keydown', escape)

    return () => {
      document.removeEventListener('keydown', escape)
      document.removeEventListener('keydown', down)
    }
  }, [toggleOpen, close])

  useEffect(() => {
    switch (isOpen) {
      case true:
        document.body.classList.add('overflow-hidden')
        break
      default:
        document.body.classList.remove('overflow-hidden')
    }
  }, [isOpen])

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="z-40 fixed top-0 left-0 w-full h-full bg-black/50"
              onClick={close}
            />
            <motion.aside
              initial={{ x: 450, opacity: 0.8 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ ease: 'easeInOut', duration: 0.4 }}
              exit={{ x: 450 }}
              className={cn(
                'z-50 fixed top-0 right-0 h-full w-full sm:w-[400px] rounded-l-lg bg-default-200 dark:bg-default-50 p-5 flex justify-between flex-col'
              )}
            >
              <div className="flex items-center sm:justify-between h-12 mb-7 relative">
                <div className="flex flex-grow items-center justify-between">
                  <h1 className="text-2xl">Itens do carrinho</h1>
                  {items.length > 0 && (
                    <Button
                      variant="light"
                      color="secondary"
                      onClick={reset}
                      size="sm"
                    >
                      Limpar carrinho
                    </Button>
                  )}
                </div>
                <Button
                  variant="bordered"
                  onClick={toggleOpen}
                  className="absolute bg-default-200 dark:bg-default-100 right-0 sm:-left-[4.5rem]"
                  isIconOnly
                >
                  <X />
                </Button>
              </div>
              <div className="flex flex-col justify-between gap-3">
                <div className="h-[calc(100vh-12rem)] space-y-4 pr-4 overflow-y-hidden hover:overflow-y-auto">
                  {items.length === 0 && (
                    <div className="flex flex-col items-center justify-center gap-2 h-full">
                      <Image src="/empty-cart.png" className="w-28" />
                      <div className="flex flex-col items-center justify-center">
                        <h1 className="text-3xl">Carrinho vazio</h1>
                        <span className="text-sm">
                          Adicione itens ao carrinho para continuar
                        </span>
                      </div>
                    </div>
                  )}
                  {items.map((item, index) => (
                    <Fragment key={item.id}>
                      <CartItem {...item} />
                      {index !== items.length - 1 && (
                        <hr className="bg-background opacity-100 dark:opacity-20" />
                      )}
                    </Fragment>
                  ))}
                </div>
                <div className="flex flex-col my-2 gap-2 h-26">
                  <Button
                    className="w-full text-lg"
                    color="secondary"
                    isDisabled={items.length === 0}
                  >
                    Comprar
                  </Button>
                  <div className="flex justify-end">
                    <h3 className="text-lg">
                      <CartTotalPrice items={items} />
                    </h3>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
