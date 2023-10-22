import { Magazine } from '../../domain/magazine'
import { IMagazineRepository } from '../interfaces/IMagazineRepository'

export class InMemoryMagazinesRepository implements IMagazineRepository {
  constructor(public magazines: Magazine[] = []) {}

  async findById(id: string): Promise<Magazine | null> {
    const magazine = this.magazines.find((magazine) => magazine.id === id)
    if (!magazine) {
      return null
    }
    return magazine
  }

  async create(magazine: Magazine): Promise<void> {
    this.magazines.push(magazine)
  }

  async delete(id: string): Promise<void> {
    const magazineIndex = this.magazines.findIndex(
      (magazine) => magazine.id === id,
    )
    this.magazines.splice(magazineIndex, 1)
  }

  async deleteMany(ids: string[]): Promise<void> {
    ids.forEach((id) => {
      const magazineIndex = this.magazines.findIndex(
        (magazine) => magazine.id === id,
      )
      this.magazines.splice(magazineIndex, 1)
    })
  }

  async update(magazine: Magazine): Promise<void> {
    const magazineIndex = this.magazines.findIndex(
      (magazine) => magazine.id === magazine.id,
    )
    this.magazines[magazineIndex] = magazine
  }

  async exists(id: string): Promise<boolean> {
    const magazine = this.magazines.some((magazine) => magazine.id === id)
    return !!magazine
  }

  async list(): Promise<Magazine[]> {
    return this.magazines
  }
}
