import { Either, left, right } from '@/core/logic/either'
import { PaymentAdvertisingNotFoundError } from '../get-payment-advertising/errors/PaymentAdvertisingNotFoundError'
import { IPaymentAdvertisingsRepository } from '../../repositories/interfaces/IAdvertisingsRepository'

type UpdateStatusPaymentAdvertisingRequest = {
  paymentAdvertisingId: string
  status: number
}

type UpdateStatusPaymentAdvertisingResponse = Either<
  PaymentAdvertisingNotFoundError,
  null
>

export class UpdateStatusPaymentAdvertising {
  constructor(
    private paymentAdvertisingsRepository: IPaymentAdvertisingsRepository,
  ) {}

  async execute({
    paymentAdvertisingId,
    status,
  }: UpdateStatusPaymentAdvertisingRequest): Promise<UpdateStatusPaymentAdvertisingResponse> {
    const paymentAdvertising =
      await this.paymentAdvertisingsRepository.findById(paymentAdvertisingId)

    if (!paymentAdvertising) {
      return left(new PaymentAdvertisingNotFoundError())
    }

    await this.paymentAdvertisingsRepository.updateStatus(
      paymentAdvertisingId,
      status,
    )

    return right(null)
  }
}
