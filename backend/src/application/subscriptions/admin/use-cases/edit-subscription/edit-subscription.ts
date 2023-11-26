import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { Either, left, right } from '@/core/logic/either'
import { Subscription } from '../../domain/subscription'
import { ISubscriptionsRepository } from '../../repositories/interfaces/ISubscriptionsRepository'
import { MagazineNotFoundError } from './errors/MagazineNotFoundError'
import { SubscriptionNotFoundError } from './errors/SubscriptionNotFoundError'
import { UserNotFoundError } from './errors/UserNotFoundError'

type EditSubscriptionRequest = {
  subscriptionId: string
  name: string
  description: string
  type: number
  frequency: number
  price: number
  magazineId: string
  userId: string
}

type EditSubscriptionResponse = Either<SubscriptionNotFoundError, Subscription>

export class EditSubscription {
  constructor(
    private subscriptionsRepository: ISubscriptionsRepository,
    private magazinesRepository: IMagazineRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    subscriptionId,
    ...request
  }: EditSubscriptionRequest): Promise<EditSubscriptionResponse> {
    const subscriptionOrError = Subscription.create(request, subscriptionId)

    if (subscriptionOrError.isLeft()) {
      return left(subscriptionOrError.value)
    }

    const subscriptionExists =
      await this.subscriptionsRepository.findById(subscriptionId)

    if (!subscriptionExists) {
      return left(new SubscriptionNotFoundError())
    }

    const magazineExists = await this.magazinesRepository.exists(
      request.magazineId,
    )

    if (!magazineExists) {
      return left(new MagazineNotFoundError())
    }

    const userExists = await this.usersRepository.findById(request.userId)

    if (!userExists) {
      return left(new UserNotFoundError())
    }

    const subscription = subscriptionOrError.value
    await this.subscriptionsRepository.update(subscription)

    return right(subscription)
  }
}
