import { Card } from '../../domain/card'
import { ICardsRepository } from '../../repositories/interfaces/ICardsRepository'

type ListCardsResponse = Card[]

export class ListCards {
  constructor(private cardsRepository: ICardsRepository) {}

  async execute(): Promise<ListCardsResponse> {
    const cards = await this.cardsRepository.list()
    return cards
  }
}
