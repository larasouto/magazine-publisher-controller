import { afterEach, beforeAll, describe, expect, it } from 'vitest'
import { CartItem, CartStore, useCartStore } from './useCartStore'

describe('useCartStore', () => {
  beforeAll(() => {
    console.log(useCartStore)
  })

  afterEach(() => {
    CartStore.removeAll()
  })

  it('should open/close the cart', () => {
    expect(CartStore.isOpen()).toBe(false)
    CartStore.toggleOpen()

    expect(CartStore.isOpen()).toBe(true)
    CartStore.close()

    expect(CartStore.isOpen()).toBe(false)
  })

  it('should close the cart', () => {
    CartStore.toggleOpen()
    expect(CartStore.isOpen()).toBe(true)

    CartStore.close()
    expect(CartStore.isOpen()).toBe(false)
  })

  it('should add an item to the cart', () => {
    CartStore.addItem({
      id: '2',
      title: 'title',
      description: 'description',
      price: 10,
      coverPath: 'coverPath'
    })

    expect(CartStore.items().length).toBe(1)
  })

  it('should increment an item if already exists', () => {
    const item: CartItem = {
      id: '1',
      title: 'title',
      description: 'description',
      price: 10,
      coverPath: 'coverPath'
    }

    CartStore.addItem(item)
    CartStore.addItem(item)
    CartStore.addItem(item)

    expect(CartStore.items().length).toBe(1)
    expect(CartStore.items()).toEqual([{ ...item, quantity: 3 }])
  })

  it('should decrement an item if quantity is greater than 1', () => {
    const item1: CartItem = {
      id: '1',
      title: 'title',
      description: 'description',
      price: 10,
      coverPath: 'coverPath'
    }

    const item2: CartItem = { ...item1, id: '2' }
    const item3: CartItem = { ...item1, id: '3' }

    CartStore.addItem(item1)
    CartStore.addItem(item1)
    CartStore.addItem(item1)
    CartStore.addItem(item2)
    CartStore.addItem(item3)

    expect(CartStore.items().length).toBe(3)

    CartStore.decrementItem(item1.id)
    CartStore.decrementItem(item1.id)

    expect(CartStore.items().length).toBe(3)
    expect(CartStore.items()).toStrictEqual([
      { ...item1, quantity: 1 },
      { ...item2, quantity: 1 },
      { ...item3, quantity: 1 }
    ])
  })

  it('should remove an item from the cart', () => {
    const item1: CartItem = {
      id: '1',
      title: 'title',
      description: 'description',
      price: 10,
      coverPath: 'coverPath'
    }

    const item2: CartItem = { ...item1, id: '2' }
    const item3: CartItem = { ...item1, id: '3' }

    CartStore.addItem(item1)
    CartStore.addItem(item1)
    CartStore.addItem(item1)
    CartStore.addItem(item2)
    CartStore.addItem(item3)

    expect(CartStore.items().length).toBe(3)

    CartStore.removeItem(item1.id)
    CartStore.removeItem(item3.id)

    expect(CartStore.items().length).toBe(1)
    expect(CartStore.items()).toStrictEqual([{ ...item2, quantity: 1 }])
  })

  it('should remove an item from the cart if quantity is 0', () => {
    const item1: CartItem = {
      id: '1',
      title: 'title',
      description: 'description',
      price: 10,
      coverPath: 'coverPath'
    }

    CartStore.addItem(item1)
    CartStore.addItem(item1)
    CartStore.addItem(item1)

    expect(CartStore.items().length).toBe(1)

    CartStore.decrementItem(item1.id)
    CartStore.decrementItem(item1.id)
    CartStore.decrementItem(item1.id)

    expect(CartStore.items().length).toBe(0)
  })

  it('should remove all items from the cart', () => {
    const item1: CartItem = {
      id: '1',
      title: 'title',
      description: 'description',
      price: 10,
      coverPath: 'coverPath'
    }

    const item2: CartItem = { ...item1, id: '2' }
    const item3: CartItem = { ...item1, id: '3' }

    CartStore.addItem(item1)
    CartStore.addItem(item1)
    CartStore.addItem(item1)
    CartStore.addItem(item2)
    CartStore.addItem(item3)

    expect(CartStore.items().length).toBe(3)

    CartStore.removeAll()

    expect(CartStore.items().length).toBe(0)
  })
})
