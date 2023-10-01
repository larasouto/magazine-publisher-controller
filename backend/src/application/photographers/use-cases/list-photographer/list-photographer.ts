import { Photographer } from '../../domain/photographer'
import { IPhotographerRepository } from '../../repositories/interfaces/IPhotographersRepository'

type ListPhotographersResponse = Photographer[]

export class ListPhotographers {
  constructor(private photographersRepository: IPhotographerRepository) {}

  async execute(): Promise<ListPhotographersResponse> {
    const photographers = await this.photographersRepository.list()
    return photographers
  }
}
