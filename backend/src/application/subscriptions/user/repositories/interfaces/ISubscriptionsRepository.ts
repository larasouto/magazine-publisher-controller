import { Subscription } from '../../domain/subscription'

export interface ISubscriptionsRepository {
  findById(id: string): Promise<Subscription | null>
  list(): Promise<Subscription[]>
  listByUser(user_id: string): Promise<Subscription[]>
  exists(id: string): Promise<boolean>
  inactivate(id: string): Promise<void>
  activate(id: string): Promise<void>
}
