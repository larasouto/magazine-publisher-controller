import { Either, left, right } from '@/core/logic/either'
import { PaymentSubscription } from '../../domain/payment-subscription'
import { IPaymentSubscriptionsRepository } from '../../repositories/interfaces/IPaymentSubscriptionsRepository'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { CustomerNotFoundError } from './errors/CustomerNotFoundError'
import { IAddressesRepository } from '@/application/addresses/repositories/interfaces/IAddressesRepository'
import { AddressNotFoundError } from './errors/AddressNotFoundError'
import { ISubscriptionsRepository } from '@/application/subscriptions/repositories/interfaces/ISubscriptionsRepository'
import { SubscriptionNotFoundError } from './errors/SubscriptionNotFoundError'
import { PaymentSubscriptionStatus } from '../../domain/payment-subscription.schema'
import { ICardsRepository } from '@/application/cards/repositories/interfaces/ICardsRepository'
import { CardNotFoundError } from './errors/CardNotFoundError'

type CreatePaymentSubscriptionRequest = {
  subscriptionId: string
  addressId: string
  cardId: string
  userId: string
}

type CreatePaymentSubscriptionResponse = Either<Error, PaymentSubscription>

export class CreatePaymentSubscription {
  constructor(
    private paymentSubscriptionsRepository: IPaymentSubscriptionsRepository,
    private usersRepository: IUsersRepository,
    private addressRepository: IAddressesRepository,
    private subscriptionsRepository: ISubscriptionsRepository,
    private cardsRepository: ICardsRepository,
  ) {}

  async execute({
    userId: customerId,
    ...request
  }: CreatePaymentSubscriptionRequest): Promise<CreatePaymentSubscriptionResponse> {
    const paymentSubscriptionOrError = PaymentSubscription.create({
      ...request,
      customerId,
      status: PaymentSubscriptionStatus.PENDING,
    })

    if (paymentSubscriptionOrError.isLeft()) {
      return left(paymentSubscriptionOrError.value)
    }

    const subscription = this.subscriptionsRepository.exists(
      request.subscriptionId,
    )

    if (!subscription) {
      return left(new SubscriptionNotFoundError())
    }

    const customer = this.usersRepository.findById(customerId)

    if (!customer) {
      return left(new CustomerNotFoundError())
    }

    const address = this.addressRepository.findById(request.addressId)

    if (!address) {
      return left(new AddressNotFoundError())
    }

    const card = this.cardsRepository.findById(request.cardId)

    if (!card) {
      return left(new CardNotFoundError())
    }

    const paymentSubscription = paymentSubscriptionOrError.value
    await this.paymentSubscriptionsRepository.create(paymentSubscription)

    return right(paymentSubscription)
  }
}
