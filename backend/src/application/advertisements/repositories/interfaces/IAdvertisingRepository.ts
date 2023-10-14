import { Advertising } from '../../domain/advertising'

export interface IAdvertisingRepository {
  findById(id: string): Promise<Advertising | null>
  list(): Promise<(Advertising | null)[]>
  create(edition: Advertising): Promise<void>
  update(edition: Advertising): Promise<void>
  delete(id: string): Promise<void>
  deleteMany(ids: string[]): Promise<void>
}
