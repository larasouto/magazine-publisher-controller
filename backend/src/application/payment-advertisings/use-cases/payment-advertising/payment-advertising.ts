import { Either, left, right } from '@/core/logic/either'
import { PaymentAdvertising } from '../../domain/payment-advertising'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { IAddressesRepository } from '@/application/addresses/repositories/interfaces/IAddressesRepository'
import { IAdvertisingsRepository } from '@/application/advertisings/repositories/interfaces/IAdvertisingsRepository'
import { PaymentAdvertisingStatus } from '../../domain/payment-advertising.schema'
import { ICardsRepository } from '@/application/cards/repositories/interfaces/ICardsRepository'
import { IPaymentAdvertisingsRepository } from '../../repositories/interfaces/IAdvertisingsRepository'
import { AdvertisingNotFoundError } from '@/application/advertisings/use-cases/get-advertising/errors/AdvertisingNotFoundError'
import { CustomerNotFoundError } from './errors/CustomerNotFoundError'
import { AddressNotFoundError } from './errors/AddressNotFoundError'
import { CardNotFoundError } from './errors/CardNotFoundError'

type CreatePaymentAdvertisingRequest = {
  advertisingId: string
  addressId: string
  cardId: string
  userId: string
}

type CreatePaymentAdvertisingResponse = Either<Error, PaymentAdvertising>

export class CreatePaymentAdvertising {
  constructor(
    private paymentAdvertisingsRepository: IPaymentAdvertisingsRepository,
    private usersRepository: IUsersRepository,
    private addressRepository: IAddressesRepository,
    private advertisingsRepository: IAdvertisingsRepository,
    private cardsRepository: ICardsRepository,
  ) {}

  async execute({
    userId: customerId,
    ...request
  }: CreatePaymentAdvertisingRequest): Promise<CreatePaymentAdvertisingResponse> {
    const paymentAdvertisingOrError = PaymentAdvertising.create({
      ...request,
      customerId,
      status: PaymentAdvertisingStatus.PENDING,
    })

    if (paymentAdvertisingOrError.isLeft()) {
      return left(paymentAdvertisingOrError.value)
    }

    const advertising = this.advertisingsRepository.findById(
      request.advertisingId,
    )

    if (!advertising) {
      return left(new AdvertisingNotFoundError())
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

    const paymentAdvertising = paymentAdvertisingOrError.value
    await this.paymentAdvertisingsRepository.create(paymentAdvertising)

    return right(paymentAdvertising)
  }
}
