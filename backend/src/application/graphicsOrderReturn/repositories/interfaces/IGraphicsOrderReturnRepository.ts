import { GraphicsOrderReturn } from '../../domain/graphicsOrderReturn'

export interface IGraphicsOrderReturnRepository {
  findById(id: string): Promise<GraphicsOrderReturn | null>
  list(): Promise<(GraphicsOrderReturn | null)[]>
  create(graphicsOrderReturn: GraphicsOrderReturn): Promise<void>
  update(graphicsOrderReturn: GraphicsOrderReturn): Promise<void>
  delete(id: string): Promise<void>
  deleteMany(ids: string[]): Promise<void>
}
