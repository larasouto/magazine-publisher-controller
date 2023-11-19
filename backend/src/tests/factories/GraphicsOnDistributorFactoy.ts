import { GraphicsOnDistributor } from "@/application/graphicsOnDistributor/domain/graphicsOnDistributor"

type GraphicsOnDistributorOverrides = {
  graphicsId?: string
  distributorId?: string
}

export class GraphicsOnDistributorFactory {
  static create(overrides?: GraphicsOnDistributorOverrides) {
    const graphicsOnDistributor = GraphicsOnDistributor.create({
      graphicsId: 'graphicsId',
      distributorId: 'distributorId',
      ...overrides,
    })

    return graphicsOnDistributor.value as GraphicsOnDistributor
  }
}
