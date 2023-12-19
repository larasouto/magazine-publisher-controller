import { Subscription } from '../../domain/subscription'
import { ISubscriptionsRepository } from '../../repositories/interfaces/ISubscriptionsRepository'

type ListSubscriptionsRequest = {
  userId: string
}

type ListSubscriptionsResponse = Subscription[]

export class ListSubscriptionsByUser {
  constructor(private subscriptionsRepository: ISubscriptionsRepository) {}

  async execute({
    userId,
  }: ListSubscriptionsRequest): Promise<ListSubscriptionsResponse> {
    console.log('uahsduhasduhasduasdhuasdhuasduh')
    const subscriptions = await this.subscriptionsRepository.listByUser(userId)
    return subscriptions
  }
}
