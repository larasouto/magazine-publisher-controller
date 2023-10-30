import { Address } from '../../domain/address'
import { IAddressesRepository } from '../interfaces/IAddressesRepository'

export class InMemoryAddressesRepository implements IAddressesRepository {
  constructor(public addresses: Address[] = []) {}

  async findById(id: string): Promise<Address | null> {
    const address = this.addresses.find((address) => address.id === id)

    if (!address) {
      return null
    }

    return address
  }

  async create(address: Address): Promise<void> {
    this.addresses.push(address)
  }

  async deleteMany(ids: string[]): Promise<void> {
    ids.forEach((id) => {
      const addressIndex = this.addresses.findIndex((address) => address.id === id)

      this.addresses.splice(addressIndex, 1)
    })
  }

  async update(address: Address): Promise<void> {
    const addressIndex = this.addresses.findIndex((address) => address.id === address.id)

    this.addresses[addressIndex] = address
  }

  async list(): Promise<Address[]> {
    return this.addresses
  }
}
