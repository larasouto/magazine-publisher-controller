import { Photographer } from '../../domain/photographer'
import { IPhotographerRepository } from '../interfaces/IPhotographersRepository'

export class InMemoryPhotographersRepository
  implements IPhotographerRepository
{
  constructor(public photographers: Photographer[] = []) {}

  async findById(id: string): Promise<Photographer> {
    const photographer = this.photographers.find(
      (photographer) => photographer.id === id,
    )

    if (!photographer) {
      return null
    }

    return photographer
  }

  async create(photographer: Photographer): Promise<void> {
    this.photographers.push(photographer)
  }

  async delete(id: string): Promise<void> {
    const photographerIndex = this.photographers.findIndex(
      (photographer) => photographer.id === id,
    )

    this.photographers.splice(photographerIndex, 1)
  }

  async deleteMany(ids: string[]): Promise<void> {
    ids.forEach((id) => {
      const photographerIndex = this.photographers.findIndex(
        (photographer) => photographer.id === id,
      )

      this.photographers.splice(photographerIndex, 1)
    })
  }

  async update(photographer: Photographer): Promise<void> {
    const photographerIndex = this.photographers.findIndex(
      (photographer) => photographer.id === photographer.id,
    )

    this.photographers[photographerIndex] = photographer
  }

  async list(): Promise<Photographer[]> {
    return this.photographers
  }
}
