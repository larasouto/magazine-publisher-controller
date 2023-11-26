import { Subscription } from '../../domain/subscription'

export interface ISubscriptionsRepository {
  findById(id: string): Promise<Subscription | null>
  list(): Promise<Subscription[]>
  exists(id: string): Promise<boolean>
  inactivate(id: string): Promise<void>
  activate(id: string): Promise<void>
}
