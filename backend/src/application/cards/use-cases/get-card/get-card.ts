import { Either, left, right } from '@/core/logic/either'
import { Card } from '../../domain/card'
import { ICardsRepository } from '../../repositories/interfaces/ICardsRepository'
import { CardNotFoundError } from './errors/CardNotFoundError'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'

type GetCardRequest = {
  cardId: string
  userId: string
}

type GetCardResponse = Either<CardNotFoundError, Card>

export class GetCard {
  constructor(private cardsRepository: ICardsRepository, private usersRepository: IUsersRepository) {}

  async execute({ cardId, userId }: GetCardRequest): Promise<GetCardResponse> {
    const card = await this.cardsRepository.findById(cardId)

    if (!card) {
      return left(new CardNotFoundError())
    }

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new CardNotFoundError())
    }

    return right(card)
  }
}
