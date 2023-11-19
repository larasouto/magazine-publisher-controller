import { GraphicsOrder } from '../../domain/graphicsOrder'

export interface IGraphicsOrderRepository {
  findById(id: string): Promise<GraphicsOrder | null>
  list(): Promise<(GraphicsOrder | null)[]>
  create(graphicsOrder: GraphicsOrder): Promise<void>
  update(graphicsOrder: GraphicsOrder): Promise<void>
  delete(id: string): Promise<void>
  deleteMany(ids: string[]): Promise<void>
}
