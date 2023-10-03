import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export type Item = {
  id: number
  title: string
  description: string
  price: number
  coverPath: string
  quantity?: number
}

type CartProps = {
  isOpen: boolean
  items: Item[]
  toggleOpen: () => void
  close: () => void
  add: (item: Item) => void
  remove: (id: number) => void
  removeItem: (id: number) => void
  reset: () => void
}

export const useCartStore = create<CartProps>()(
  devtools(
    persist(
      immer<CartProps>((set, get) => ({
        isOpen: false,
        items: [],
        close: () => set({ isOpen: false }),
        toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
        add: (item) => {
          const itemAlreadyExists = get().items.some((i) => i.id === item.id)

          if (!itemAlreadyExists) {
            set((state) => ({
              items: [...state.items, { ...item, quantity: 1 }]
            }))
            return
          }

          set((state) => ({
            items: state.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity! + 1 } : i
            )
          }))
        },
        remove: (id) => {
          const itemToRemove = get().items.find((item) => item.id === id)

          if (!itemToRemove) {
            return
          }

          if (itemToRemove.quantity && itemToRemove.quantity > 1) {
            set((state) => ({
              items: state.items.map((i) =>
                i.id === id ? { ...i, quantity: i.quantity! - 1 } : i
              )
            }))
            return
          } else {
            set((state) => ({
              items: state.items.filter((i) => i.id !== id)
            }))
          }
        },
        removeItem(id) {
          const itemToRemove = get().items.find((item) => item.id === id)

          if (!itemToRemove) {
            return
          }

          set((state) => ({
            items: state.items.filter((i) => i.id !== id)
          }))
        },
        reset: () => set({ items: [] })
      })),
      {
        name: 'cart'
      }
    )
  )
)
