import { Subscription } from '../../domain/subscription'

export interface ISubscriptionsRepository {
  findById(id: string): Promise<Subscription | null>
  create(subscription: Subscription): Promise<void>
  update(subscription: Subscription): Promise<void>
  deleteMany(ids: string[]): Promise<void>
  list(): Promise<Subscription[]>
  exists(id: string): Promise<boolean>
}
