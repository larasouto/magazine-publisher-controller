import { Either, left, right } from '@/core/logic/either'
import { Card } from '../../domain/card'
import { ICardsRepository } from '../../repositories/interfaces/ICardsRepository'
import { number } from 'zod'
import { User } from '@/application/users/domain/user'
import { UserNotFoundError } from './errors/UserNotFoundError'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'

type CreateCardRequest = {
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

type CreateCardResponse = Either<Error, Card>

export class CreateCard {
  constructor(
    private cardsRepository: ICardsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute(request: CreateCardRequest): Promise<CreateCardResponse> {
    const cardOrError = Card.create(request)

    if (cardOrError.isLeft()) {
      return left(cardOrError.value)
    }

    const userExists = await this.usersRepository.findById(request.userId)

    if (!userExists) {
      return left(new UserNotFoundError())
    }

    const card = cardOrError.value
    await this.cardsRepository.create(card)

    return right(card)
  }
}
