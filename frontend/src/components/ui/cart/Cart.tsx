import { useCartStore } from '@/stores/useCartStore'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { cn } from '../../../lib/utils'
import { CartBottomContent } from './sections/CartBottomContent'
import { CartItems } from './sections/CartItems'
import { CartTopContent } from './sections/CartTopContent'

export const Cart = () => {
  const [isOpen, close] = useCartStore((state) => [state.isOpen, state.close])

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
              initial={{ x: 768, opacity: 0.8 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ ease: 'easeInOut', duration: 0.6 }}
              exit={{ x: 768 }}
              className={cn(
                'z-50 fixed top-0 right-0 h-full w-full sm:w-[480px] rounded-l-lg bg-default-200 dark:bg-default-50 p-5 grid grid-rows-[auto,_1fr] gap-2'
              )}
            >
              <CartTopContent />
              <CartItems />
              <CartBottomContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
