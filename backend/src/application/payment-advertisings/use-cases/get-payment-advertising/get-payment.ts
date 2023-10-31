import { Either, left, right } from '@/core/logic/either'
import { PaymentAdvertising } from '../../domain/payment-advertising'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'

import { UserNotFoundError } from './errors/UserNotFoundError'
import { PaymentAdvertisingNotFoundError } from './errors/PaymentAdvertisingNotFoundError'
import { IPaymentAdvertisingsRepository } from '../../repositories/interfaces/IAdvertisingsRepository'

type GetPaymentRequest = {
  paymentId: string
  userId: string
}

type GetPaymentResponse = Either<
  PaymentAdvertisingNotFoundError,
  PaymentAdvertising
>

export class GetPayment {
  constructor(
    private paymentsRepository: IPaymentAdvertisingsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    paymentId,
    userId,
  }: GetPaymentRequest): Promise<GetPaymentResponse> {
    const payment = await this.paymentsRepository.findById(paymentId)

    if (!payment) {
      return left(new PaymentAdvertisingNotFoundError())
    }

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new UserNotFoundError())
    }

    return right(payment)
  }
}
