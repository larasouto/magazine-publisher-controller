import { Edition } from '../../domain/edition'
import { IEditionRepository } from '../../repositories/interfaces/IEditionRepository'

type ListEditionsResponse = Edition[]

export class ListEditions {
  constructor(private editionsRepository: IEditionRepository) {}

  async execute(): Promise<ListEditionsResponse> {
    const editions = await this.editionsRepository.list()
    return editions
  }
}
