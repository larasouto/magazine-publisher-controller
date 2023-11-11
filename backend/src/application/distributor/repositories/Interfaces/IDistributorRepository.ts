import { Distributor } from '../../domain/distributor'

export interface IDistributorRepository {
  findById(id: string): Promise<Distributor | null>
  create(distributor: Distributor): Promise<void>
  update(distributor: Distributor): Promise<void>
  delete(id: string): Promise<void>
  deleteMany(ids: string[]): Promise<void>
  list(): Promise<Distributor[]>
}
