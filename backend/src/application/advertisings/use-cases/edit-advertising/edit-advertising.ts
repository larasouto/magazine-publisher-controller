import { Either, left, right } from '@/core/logic/either'
import { Advertising } from '../../domain/advertising'
import { IAdvertisingsRepository } from '../../repositories/interfaces/IAdvertisingsRepository'
import { AdvertisingNotFoundError } from './errors/AdvertisingNotFoundError'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { UserNotFoundError } from './errors/UserNotFoundError'
import { AdvertisingStatus } from '../../domain/advertising.schema'
import { AdvertisingAlreadyApprovedError } from './errors/AdvertisingAlreadyApprovedError'

type EditAdvertisingRequest = {
  advertisingId: string
  imagePath: string
  title: string
  category: number
  type: number
  price: number
  magazineId: string
  userId: string
}

type EditAdvertisingResponse = Either<AdvertisingNotFoundError, Advertising>

export class EditAdvertising {
  constructor(
    private advertisingsRepository: IAdvertisingsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    advertisingId,
    ...request
  }: EditAdvertisingRequest): Promise<EditAdvertisingResponse> {
    const advertisingOrError = Advertising.create(
      { ...request, status: AdvertisingStatus.PENDING },
      advertisingId,
    )

    const advertisignApproved =
      await this.advertisingsRepository.findById(advertisingId)

    if (advertisignApproved?.props.status === AdvertisingStatus.APPROVED) {
      return left(new AdvertisingAlreadyApprovedError())
    }

    if (advertisingOrError.isLeft()) {
      return left(advertisingOrError.value)
    }

    const userExists = await this.usersRepository.findById(request.userId)

    if (!userExists) {
      return left(new UserNotFoundError())
    }

    const advertisingExists =
      await this.advertisingsRepository.findById(advertisingId)

    if (!advertisingExists) {
      return left(new AdvertisingNotFoundError())
    }

    const advertising = advertisingOrError.value
    await this.advertisingsRepository.update(advertising)

    return right(advertising)
  }
}
