import { Either, left, right } from '@/core/logic/either'
import { Order } from '../../domain/order'
import { IOrderRepository } from '../../repositories/interfaces/IOrdersRepository'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { CustomerNotFoundError } from './errors/CustomerNotFoundError'
import { IAddressesRepository } from '@/application/addresses/repositories/interfaces/IAddressesRepository'
import { AddressNotFoundError } from './errors/AddressNotFoundError'

type CreateOrderRequest = {
  totalValue: number
  status: number
  addressId: string
  paymentMethod: number
  items: {
    editionId: string
    quantity: number
  }[]
  userId: string
}

type CreateOrderResponse = Either<Error, Order>

export class CreateOrder {
  constructor(
    private ordersRepository: IOrderRepository,
    private usersRepository: IUsersRepository,
    private addressRepository: IAddressesRepository,
  ) {}

  async execute({
    userId: customerId,
    ...request
  }: CreateOrderRequest): Promise<CreateOrderResponse> {
    const orderOrError = Order.create({ ...request, customerId })

    if (orderOrError.isLeft()) {
      return left(orderOrError.value)
    }

    const customer = this.usersRepository.findById(customerId)

    if (!customer) {
      return left(new CustomerNotFoundError())
    }

    const address = this.addressRepository.findById(request.addressId)

    if (!address) {
      return left(new AddressNotFoundError())
    }

    const order = orderOrError.value
    await this.ordersRepository.create(order)

    return right(order)
  }
}
