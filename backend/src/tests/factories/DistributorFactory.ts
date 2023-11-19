import { Distributor } from '@/application/distributor/domain/distributor'

type DistributorOverrides = {
  name?: string
  address?: string
  region?: string
}

export class DistributorFactory {
  static create(overrides?: DistributorOverrides) {
    const distributor = Distributor.create({
      name: 'test-distributor-name',
      address: 'test-distributor-address',
      region: 'test-distributor-region',
      ...overrides,
    })

    return distributor.value as Distributor
  }
}
