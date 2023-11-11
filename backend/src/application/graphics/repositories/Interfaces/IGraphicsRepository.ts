import { Graphics } from '../../domain/graphics'

export interface IGraphicsRepository {
  findById(id: string): Promise<Graphics | null>
  create(graphics: Graphics): Promise<void>
  update(graphics: Graphics): Promise<void>
  delete(id: string): Promise<void>
  deleteMany(ids: string[]): Promise<void>
  list(): Promise<Graphics[]>
}
