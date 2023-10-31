import { Order } from '@/application/orders/domain/order'
import { OrderStatus } from '@/application/orders/domain/order.schema'

type OrderOverrides = {
  totalValue?: number
  status?: number
  addressId?: string
  paymentMethod?: number
  customerId?: string
}

export class OrderFactory {
  static create(overrides?: OrderOverrides) {
    const order = Order.create({
      totalValue: 100,
      status: OrderStatus.PENDING,
      addressId: 'test-address-id',
      cardId: 'test-card-id',
      customerId: 'test-customer-id',
      ...overrides,
    })

    return order.value as Order
  }
}
