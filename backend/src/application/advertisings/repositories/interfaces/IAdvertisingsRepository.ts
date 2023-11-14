import { Advertising } from '../../domain/advertising'

export interface IAdvertisingsRepository {
  findById(id: string): Promise<Advertising | null>
  list(): Promise<Advertising[]>
  create(advertising: Advertising): Promise<void>
  update(advertising: Advertising): Promise<void>
  deleteMany(ids: string[]): Promise<void>
  updateStatus(id: string, status: number): Promise<void>
  updatePayment(id: string): Promise<void>
}
