import { Either, left, right } from '@/core/logic/either'
import { Subscription } from '../../domain/subscription'
import { ISubscriptionsRepository } from '../../repositories/interfaces/ISubscriptionsRepository'
import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'
import { MagazineNotFoundError } from './errors/MagazineNotFoundError'

type CreateSubscriptionRequest = {
  name: string
  description: string
  type: number
  frequency: number
  price: number
  magazineId: string
}

type CreateSubscriptionResponse = Either<Error, Subscription>

export class CreateSubscription {
  constructor(
    private subscriptionsRepository: ISubscriptionsRepository,
    private magazinesRepository: IMagazineRepository,
  ) {}

  async execute(
    request: CreateSubscriptionRequest,
  ): Promise<CreateSubscriptionResponse> {
    const subscriptionOrError = Subscription.create(request)

    if (subscriptionOrError.isLeft()) {
      return left(subscriptionOrError.value)
    }

    const magazineExists = await this.magazinesRepository.exists(
      request.magazineId,
    )

    if (!magazineExists) {
      return left(new MagazineNotFoundError())
    }

    const user = subscriptionOrError.value
    await this.subscriptionsRepository.create(user)

    return right(user)
  }
}
