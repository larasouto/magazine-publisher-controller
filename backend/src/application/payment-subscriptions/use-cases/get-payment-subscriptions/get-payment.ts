import { Either, left, right } from '@/core/logic/either'
import { PaymentSubscription } from '../../domain/payment-subscription'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { PaymentSubscriptionNotFoundError } from './errors/PaymentSubscriptionNotFoundError'
import { IPaymentSubscriptionsRepository } from '../../repositories/interfaces/IPaymentSubscriptionsRepository'
import { UserNotFoundError } from './errors/UserNotFoundError'

type GetPaymentRequest = {
  paymentId: string
  userId: string
}

type GetPaymentResponse = Either<PaymentSubscriptionNotFoundError, PaymentSubscription>

export class GetPayment {
  constructor(
    private paymentsRepository: IPaymentSubscriptionsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    paymentId,
    userId,
  }: GetPaymentRequest): Promise<GetPaymentResponse> {
    const payment = await this.paymentsRepository.findById(paymentId)

    if (!payment) {
      return left(new PaymentSubscriptionNotFoundError())
    }

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new UserNotFoundError())
    }

    return right(payment)
  }
}
