import { Graphics } from '../../domain/graphics'
import { IGraphicsRepository } from '../Interfaces/IGraphicsRepository'

export class InMemoryGraphicssRepository implements IGraphicsRepository {
  constructor(public graphicss: Graphics[] = []) {}

  async findById(id: string): Promise<Graphics | null> {
    const graphics = this.graphicss.find((graphics) => graphics.id === id)

    if (!graphics) {
      return null
    }

    return graphics
  }

  async create(graphics: Graphics): Promise<void> {
    this.graphicss.push(graphics)
  }

  async delete(id: string): Promise<void> {
    const graphicsIndex = this.graphicss.findIndex(
      (graphics) => graphics.id === id,
    )

    this.graphicss.splice(graphicsIndex, 1)
  }

  async deleteMany(ids: string[]): Promise<void> {
    ids.forEach((id) => {
      const graphicsIndex = this.graphicss.findIndex(
        (graphics) => graphics.id === id,
      )

      this.graphicss.splice(graphicsIndex, 1)
    })
  }

  async update(graphics: Graphics): Promise<void> {
    const graphicsIndex = this.graphicss.findIndex(
      (graphics) => graphics.id === graphics.id,
    )

    this.graphicss[graphicsIndex] = graphics
  }

  async list(): Promise<Graphics[]> {
    return this.graphicss
  }
}
