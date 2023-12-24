import { Graphic } from '../../domain/graphics'
import { IGraphicsRepository } from '../Interfaces/IGraphicsRepository'

export class InMemoryGraphicssRepository implements IGraphicsRepository {
  constructor(public graphics: Graphic[] = []) {}

  async findById(id: string): Promise<Graphic | null> {
    const graphics = this.graphics.find((graphics) => graphics.id === id)

    if (!graphics) {
      return null
    }

    return graphics
  }

  async create(graphics: Graphic): Promise<void> {
    this.graphics.push(graphics)
  }

  async deleteMany(ids: string[]): Promise<void> {
    ids.forEach((id) => {
      const graphicsIndex = this.graphics.findIndex(
        (graphics) => graphics.id === id,
      )

      this.graphics.splice(graphicsIndex, 1)
    })
  }

  async update(graphics: Graphic): Promise<void> {
    const graphicsIndex = this.graphics.findIndex(
      (graphics) => graphics.id === graphics.id,
    )

    this.graphics[graphicsIndex] = graphics
  }

  async list(): Promise<Graphic[]> {
    return this.graphics
  }
}
