import { Card } from '../../domain/card'
import { ICardsRepository } from '../../repositories/interfaces/ICardsRepository'

type ListCardsResponse = Card[]

type ListCardsRequest = {
  userId: string
}

export class ListCards {
  constructor(private cardsRepository: ICardsRepository) {}

  async execute({ userId }: ListCardsRequest): Promise<ListCardsResponse> {
    const cards = await this.cardsRepository.list(userId)
    return cards
  }
}
