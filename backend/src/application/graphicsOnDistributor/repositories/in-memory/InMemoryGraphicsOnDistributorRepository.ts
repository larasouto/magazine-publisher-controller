import { GraphicsOnDistributor } from '../../domain/graphicsOnDistributor'
import { IGraphicsOnDistributorRepository } from '../Interfaces/IGraphicsOnDistributorRepository'

export class InMemoryGraphicsOnDistributorRepository implements IGraphicsOnDistributorRepository {
  constructor(public graphicsOnDistributor: GraphicsOnDistributor[] = []) {}

  async findById(id: string): Promise<GraphicsOnDistributor | null> {
    const graphics = this.graphicsOnDistributor.find((graphics) => graphics.id === id)

    if (!graphics) {
      return null
    }

    return graphics
  }

  async create(graphicsOnDistributor: GraphicsOnDistributor): Promise<void> {
    this.graphicsOnDistributor.push(graphicsOnDistributor)
  }

  async delete(id: string): Promise<void> {
    const graphicsIndex = this.graphicsOnDistributor.findIndex(
      (graphicsOnDistributor) => graphicsOnDistributor.id === id,
    )

    this.graphicsOnDistributor.splice(graphicsIndex, 1)
  }

  async deleteMany(ids: string[]): Promise<void> {
    ids.forEach((id) => {
      const graphicsIndex = this.graphicsOnDistributor.findIndex(
        (graphicsOnDistributor) => graphicsOnDistributor.id === id,
      )

      this.graphicsOnDistributor.splice(graphicsIndex, 1)
    })
  }

  async update(graphicsOnDistributor: GraphicsOnDistributor): Promise<void> {
    const graphicsIndex = this.graphicsOnDistributor.findIndex(
      (graphicsOnDistributor) => graphicsOnDistributor.id === graphicsOnDistributor.id,
    )

    this.graphicsOnDistributor[graphicsIndex] = graphicsOnDistributor
  }

  async list(): Promise<GraphicsOnDistributor[]> {
    return this.graphicsOnDistributor
  }
}
