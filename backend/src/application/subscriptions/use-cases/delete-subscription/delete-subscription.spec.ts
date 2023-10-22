import { SubscriptionFactory } from '@/tests/factories/SubscriptionFactory'
import { beforeEach, describe, expect, test } from 'vitest'
import { InMemorySubscriptionsRepository } from '../../repositories/in-memory/InMemorySubscriptionsRepository'
import { ISubscriptionsRepository } from '../../repositories/interfaces/ISubscriptionsRepository'
import { DeleteSubscription } from './delete-subscription'

let subscriptionsRepository: ISubscriptionsRepository
let deleteSubscription: DeleteSubscription

describe('Delete subscription', () => {
  beforeEach(() => {
    subscriptionsRepository = new InMemorySubscriptionsRepository()
    deleteSubscription = new DeleteSubscription(subscriptionsRepository)
  })

  test('should delete a subscription', async () => {
    const subscription1 = SubscriptionFactory.create()
    const subscription2 = SubscriptionFactory.create()

    await subscriptionsRepository.create(subscription1)
    await subscriptionsRepository.create(subscription2)

    const response = await deleteSubscription.execute({
      subscriptionId: [subscription1.id, subscription2.id],
    })

    expect(response.isRight()).toBeTruthy()
    expect(await subscriptionsRepository.list()).toStrictEqual([])
  })

  test('should not delete a non-existing subscription', async () => {
    const subscription1 = SubscriptionFactory.create()
    await subscriptionsRepository.create(subscription1)

    const response = await deleteSubscription.execute({
      subscriptionId: [subscription1.id, 'non-existing-id'],
    })

    expect(response.isLeft()).toBeTruthy()
    expect(await subscriptionsRepository.list()).toStrictEqual([subscription1])
  })
})
