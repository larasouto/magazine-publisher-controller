import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export type CartItem = {
  id: string
  title: string
  description: string
  price: number
  coverPath: string
  quantity?: number
}

export type CartStoreProps = {
  isOpen: boolean
  items: CartItem[]
  toggleOpen: () => void
  close: () => void
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  incrementItem: (id: string) => void
  decrementItem: (id: string) => void
  removeAll: () => void
  getItemQuantity: (id: string) => number
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
        removeAll: () => removeAll(),
        getItemQuantity: (id) => getItemQuantity(id)
      })),
      {
        name: 'cart',
        storage: createJSONStorage(() => localStorage)
      }
    )
  )
)

/**
 * Abre ou fecha o carrinho.
 */
const toggleOpen = () => {
  useCartStore.setState((state) => ({ isOpen: !state.isOpen }))
}

/**
 * Fecha o carrinho.
 */
const close = () => {
  useCartStore.setState({ isOpen: false })
}

/**
 * Remove todos os itens do carrinho.
 */
const removeAll = () => {
  useCartStore.setState({ items: [] })
}

const addItem = (item: CartItem) => {
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

const incrementItem = (id: string) => {
  /**
   * Incrementa a unidade do item.
   */
  useCartStore.setState((state) => ({
    items: state.items.map((_item) =>
      _item.id === id ? { ..._item, quantity: _item.quantity! + 1 } : _item
    )
  }))
}

const decrementItem = (id: string) => {
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

const getItemQuantity = (id: string) => {
  /**
   * Verifica se o item já existe no carrinho e,
   * caso exista, retorna o item.
   */
  const item = useCartStore.getState().items.find((item) => item.id === id)

  /**
   * Caso exista, retorna a quantidade do item. Caso não, retorna 0.
   */
  return item?.quantity || 0
}

const removeItem = (id: string) => {
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
 * Caso queira usar sem o hook (sem reatividade).
 */
export const CartStore: Omit<CartStoreProps, 'isOpen' | 'items'> & {
  isOpen: () => boolean
  items: () => CartItem[]
} = {
  isOpen: () => useCartStore.getState().isOpen,
  items: () => useCartStore.getState().items,
  toggleOpen: () => useCartStore.getState().toggleOpen(),
  close: () => useCartStore.getState().close(),
  addItem: (item) => useCartStore.getState().addItem(item),
  incrementItem: (id) => useCartStore.getState().incrementItem(id),
  decrementItem: (id) => useCartStore.getState().decrementItem(id),
  removeItem: (id) => useCartStore.getState().removeItem(id),
  removeAll: () => useCartStore.getState().removeAll(),
  getItemQuantity: (id) => getItemQuantity(id)
}
