import { Graphic } from '../../domain/graphics'

export interface IGraphicsRepository {
  findById(id: string): Promise<Graphic | null>
  create(graphic: Graphic): Promise<void>
  update(graphic: Graphic): Promise<void>
  deleteMany(ids: string[]): Promise<void>
  list(): Promise<Graphic[]>
}
