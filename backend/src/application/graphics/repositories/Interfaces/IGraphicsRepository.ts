import { Graphics } from '../../domain/graphics'

export interface IGraphicsRepository {
  findById(id: string): Promise<Graphics | null>
  create(theme: Graphics): Promise<void>
  update(theme: Graphics): Promise<void>
  delete(id: string): Promise<void>
  deleteMany(ids: string[]): Promise<void>
  list(): Promise<Graphics[]>
}
