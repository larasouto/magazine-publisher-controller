import { Either, left, right } from '@/core/logic/either'
import { ICardsRepository } from '../../repositories/interfaces/ICardsRepository'
import { CardNotFoundError } from './errors/CardNotFoundError'
import { OneOrMoreCardNotFoundError } from './errors/OneOrMoreCardNotFoundError'

type DeleteCardRequest = {
  ids: string[]
}

type DeleteCardResponse = Either<CardNotFoundError, null>

export class DeleteCard {
  constructor(private cardsRepository: ICardsRepository) {}

  async execute({
    ids: cardId,
  }: DeleteCardRequest): Promise<DeleteCardResponse> {
    const cardOrCards = Array.isArray(cardId) ? cardId : [cardId]

    if (cardOrCards.length === 0) {
      return left(new CardNotFoundError())
    }
    const cardPromises = cardOrCards
      .filter((cardId) => cardId)
      .map((cardId) => this.cardsRepository.findById(cardId))

    const cards = await Promise.all(cardPromises)

    if (cards.some((card) => card === null)) {
      return left(
        cards.length > 1
          ? new OneOrMoreCardNotFoundError()
          : new CardNotFoundError(),
      )
    }

    await this.cardsRepository.deleteMany(cardOrCards)

    return right(null)
  }
}
