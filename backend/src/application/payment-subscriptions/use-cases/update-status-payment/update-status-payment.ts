import { Either, left, right } from '@/core/logic/either'
import { IPaymentSubscriptionsRepository } from '../../repositories/interfaces/IPaymentSubscriptionsRepository'
import { PaymentSubscriptionNotFoundError } from './errors/PaymentSubscriptionNotFoundError'

type UpdateStatusPaymentSubscriptionRequest = {
  paymentSubscriptionId: string
  status: number
}

type UpdateStatusPaymentSubscriptionResponse = Either<
  PaymentSubscriptionNotFoundError,
  null
>

export class UpdateStatusPaymentSubscription {
  constructor(
    private paymentSubscriptionsRepository: IPaymentSubscriptionsRepository,
  ) {}

  async execute({
    paymentSubscriptionId,
    status,
  }: UpdateStatusPaymentSubscriptionRequest): Promise<UpdateStatusPaymentSubscriptionResponse> {
    const paymentSubscription =
      await this.paymentSubscriptionsRepository.findById(paymentSubscriptionId)

    if (!paymentSubscription) {
      return left(new PaymentSubscriptionNotFoundError())
    }

    await this.paymentSubscriptionsRepository.updateStatus(
      paymentSubscriptionId,
      status,
    )

    return right(null)
  }
}
