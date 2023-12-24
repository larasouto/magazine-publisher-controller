import { Address } from '../../domain/address'

export interface IAddressesRepository {
  findById(id: string): Promise<Address | null>
  create(address: Address): Promise<void>
  update(address: Address): Promise<void>
  deleteMany(ids: string[]): Promise<void>
  list(userId: string): Promise<Address[]>
}
