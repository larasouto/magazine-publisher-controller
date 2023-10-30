import { Order } from '@/application/orders/domain/order'
import {
  OrderStatus,
  PaymentMethod,
} from '@/application/orders/domain/order.schema'

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
      paymentMethod: PaymentMethod.CREDIT_CARD,
      customerId: 'test-customer-id',
      ...overrides,
    })

    return order.value as Order
  }
}
