import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export type Item = {
  id: number
  title: string
  description: string
  price: number
  coverPath: string
  quantity?: number
}

type CartStoreProps = {
  isOpen: boolean
  items: Item[]
  toggleOpen: () => void
  close: () => void
  addItem: (item: Item) => void
  removeItem: (id: number) => void
  incrementItem: (id: number) => void
  decrementItem: (id: number) => void
  removeAll: () => void
}

export const useCartStore = create<CartStoreProps>()(
  devtools(
    persist(
      immer<CartStoreProps>(() => ({
        isOpen: false,
        items: [],
        toggleOpen: () => toggleOpen(),
        close: () => close(),
        addItem: (item) => addItem(item),
        incrementItem: (id) => incrementItem(id),
        decrementItem: (id) => decrementItem(id),
        removeItem: (id) => removeItem(id),
        removeAll: () => removeAll()
      })),
      {
        name: 'cart',
        storage: createJSONStorage(() => localStorage)
      }
    )
  )
)

const toggleOpen = () => {
  useCartStore.setState((state) => ({ isOpen: !state.isOpen }))
}

const close = () => {
  useCartStore.setState({ isOpen: false })
}

const removeAll = () => {
  useCartStore.setState({ items: [] })
}

const addItem = (item: Item) => {
  /**
   * Verifica se o item já existe no carrinho e,
   * caso exista, retorna o item.
   */
  const itemAlreadyExists = useCartStore
    .getState()
    .items.find((_item) => _item.id === item.id)

  /**
   * Caso exista, incrementa a unidade do item.
   */
  if (itemAlreadyExists) {
    useCartStore.getState().incrementItem(itemAlreadyExists.id)
    return
  }

  /**
   * Caso não exista, adiciona o item ao carrinho.
   */
  useCartStore.setState((state) => ({
    items: [...state.items, { ...item, quantity: 1 }]
  }))
}

const incrementItem = (id: number) => {
  /**
   * Incrementa a unidade do item.
   */
  useCartStore.setState((state) => ({
    items: state.items.map((_item) =>
      _item.id === id ? { ..._item, quantity: _item.quantity! + 1 } : _item
    )
  }))
}

const decrementItem = (id: number) => {
  /**
   * Verifica se o item já existe no carrinho e,
   * caso exista, retorna o item.
   */
  const itemToRemove = useCartStore
    .getState()
    .items.find((item) => item.id === id)

  /**
   * Caso não exista, não há nada para
   * ser decrementado.
   */
  if (!itemToRemove) {
    return
  }

  /**
   * Caso exista, decrementa a unidade do item no carrinho
   * se, e somente se, o item possuir mais de uma unidade.
   */
  if (itemToRemove.quantity && itemToRemove.quantity > 1) {
    useCartStore.setState((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity! - 1 } : i
      )
    }))
    return
  }

  /**
   * Caso o item possua apenas uma unidade, remove o item
   * do carrinho.
   */
  useCartStore.setState((state) => ({
    items: state.items.filter((i) => i.id !== id)
  }))
}

const removeItem = (id: number) => {
  /**
   * Verifica se o item já existe no carrinho e,
   * caso exista, retorna o item.
   */
  const itemToRemove = useCartStore
    .getState()
    .items.find((item) => item.id === id)

  /**
   * Caso não exista, não há nada para
   * ser removido.
   */
  if (!itemToRemove) {
    return
  }

  /**
   * Caso exista, remove o item do carrinho.
   */
  useCartStore.setState((state) => ({
    items: state.items.filter((_item) => _item.id !== id)
  }))
}

/**
 * Caso queira usar sem o hook (sem ts reativo).
 */
export const CartStore: Omit<CartStoreProps, 'isOpen' | 'items'> & {
  isOpen: () => boolean
  items: () => Item[]
} = {
  isOpen: () => useCartStore.getState().isOpen,
  items: () => useCartStore.getState().items,
  toggleOpen: () => useCartStore.getState().toggleOpen(),
  close: () => useCartStore.getState().close(),
  addItem: (item) => useCartStore.getState().addItem(item),
  incrementItem: (id) => useCartStore.getState().incrementItem(id),
  decrementItem: (id) => useCartStore.getState().decrementItem(id),
  removeItem: (id) => useCartStore.getState().removeItem(id),
  removeAll: () => useCartStore.getState().removeAll()
}
