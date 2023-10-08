import { Edition } from '../../domain/edition'
import { IEditionRepository } from '../interfaces/IEditionRepository'

export class InMemoryEditionsRepository implements IEditionRepository {
  constructor(public editions: Edition[] = []) {}

  async findById(id: string): Promise<Edition | null> {
    const edition = this.editions.find((edition) => edition.id === id)

    if (!edition) {
      return null
    }

    return edition
  }

  async create(edition: Edition): Promise<void> {
    this.editions.push(edition)
  }

  async delete(id: string): Promise<void> {
    const editionIndex = this.editions.findIndex((edition) => edition.id === id)

    this.editions.splice(editionIndex, 1)
  }

  async deleteMany(ids: string[]): Promise<void> {
    ids.forEach((id) => {
      const editionIndex = this.editions.findIndex(
        (edition) => edition.id === id,
      )

      this.editions.splice(editionIndex, 1)
    })
  }

  async update(edition: Edition): Promise<void> {
    const editionIndex = this.editions.findIndex(
      (edition) => edition.id === edition.id,
    )

    this.editions[editionIndex] = edition
  }

  async list(): Promise<Edition[]> {
    return this.editions
  }
}
