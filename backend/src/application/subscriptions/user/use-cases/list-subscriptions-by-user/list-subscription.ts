import { Subscription } from '../../domain/subscription'
import { ISubscriptionsRepository } from '../../repositories/interfaces/ISubscriptionsRepository'

type ListSubscriptionsResponse = Subscription[]

export class ListSubscriptions {
  constructor(private subscriptionsRepository: ISubscriptionsRepository) {}

  async execute(userId: string): Promise<ListSubscriptionsResponse> {
    const subscriptions = await this.subscriptionsRepository.listByUser(userId)
    return subscriptions
  }
}
