import { Photographer } from '../../domain/photographer'
import { PhotographerStatus } from '../../domain/photographer.schema'
import { IPhotographerRepository } from '../interfaces/IPhotographersRepository'

export class InMemoryPhotographersRepository
  implements IPhotographerRepository
{
  constructor(public photographers: Photographer[] = []) {}

  async findById(id: string): Promise<Photographer | null> {
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

  async inactivate(id: string): Promise<void> {
    const photographerIndex = this.photographers.findIndex(
      (reporter) => reporter.id === id,
    )

    const photographer = {
      ...this.photographers[photographerIndex].props,
      status: PhotographerStatus.INACTIVE,
    }

    const reporter = Photographer.create(photographer).value as Photographer

    this.photographers[photographerIndex] = reporter
  }
}
