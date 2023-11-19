import { GraphicsOnDistributor } from '../../domain/graphicsOnDistributor'

export interface IGraphicsOnDistributorRepository {
  findById(id: string): Promise<GraphicsOnDistributor | null>
  create(graphicsOnDistributor: GraphicsOnDistributor): Promise<void>
  update(graphicsOnDistributor: GraphicsOnDistributor): Promise<void>
  delete(id: string): Promise<void>
  deleteMany(id: string[]): Promise<void>
  list(): Promise<GraphicsOnDistributor[]>
}
