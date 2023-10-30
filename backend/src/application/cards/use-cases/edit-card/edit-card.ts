import { Either, left, right } from '@/core/logic/either'
import { Card } from '../../domain/card'
import { ICardsRepository } from '../../repositories/interfaces/ICardsRepository'
import { CardNotFoundError } from './errors/CardNotFoundError'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { UserNotFoundError } from './errors/UserNotFoundError'

type EditCardRequest = {
  cardId: string
  number: string
  holder: string
  expirationDate: string
  securityCode: number
  billingAddress: string
  phone: string
  type: number
  flag: string
  userId: string
}

type EditCardResponse = Either<CardNotFoundError, Card>

export class EditCard {
  constructor(
    private cardsRepository: ICardsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    cardId,
    ...request
  }: EditCardRequest): Promise<EditCardResponse> {
    const cardOrError = Card.create(request, cardId)

    if (cardOrError.isLeft()) {
      return left(cardOrError.value)
    }

    const userExists = await this.usersRepository.findById(request.userId)

    if (!userExists) {
      return left(new UserNotFoundError())
    }

    const cardExists = await this.cardsRepository.findById(cardId)

    if (!cardExists) {
      return left(new CardNotFoundError())
    }

    const card = cardOrError.value
    await this.cardsRepository.update(card)

    return right(card)
  }
}
