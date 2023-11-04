import { Address } from '@/application/addresses/domain/address'

type AddressOverrides = {
  number?: number
  street?: string
  city?: string
  state?: string
  zip?: string
  complement?: string
  userId: string
}

export class AddressFactory {
  static create(overrides?: AddressOverrides) {
    const address = Address.create({
      number: 100,
      street: 'test-street',
      city: 'test-city',
      state: 'test-state',
      zip: '97310-180',
      complement: 'test-complement',
      userId: 'test-user-id',
      ...overrides,
    })

    return address.value as Address
  }
}
