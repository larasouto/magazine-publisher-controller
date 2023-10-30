import { InMemoryCardsRepository } from '@/application/cards/repositories/in-memory/InMemoryCardsRepository'
import { v4 as uuid } from 'uuid'
import { beforeAll, describe, expect, test } from 'vitest'
import { ICardsRepository } from '../../repositories/interfaces/ICardsRepository'
import { GetCard } from './get-card'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'
import { User } from '@/application/users/domain/user'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { UserFactory } from '@/tests/factories/UserFactory'
import { Card } from '../../domain/card'
import { CardFactory } from '@/tests/factories/CardFactory'

let cardsRepository: ICardsRepository
let getCard: GetCard
let usersRepository: IUsersRepository

describe('Get a card', () => {
  const user = UserFactory.create()
  const card = CardFactory.create({ userId: user.id })

  beforeAll(async () => {
    cardsRepository = new InMemoryCardsRepository()
    usersRepository = new InMemoryUsersRepository()
    getCard = new GetCard(cardsRepository, usersRepository)
    await usersRepository.create(user)
    await cardsRepository.create(card)
  })

  test('should be able to get a card', async () => {
    const _card = await getCard.execute({ cardId: card.id, userId: user.id })

    expect(_card.isRight()).toBeTruthy()
  })

  test('should not be able to get a non existing card', async () => {
    const card = await getCard.execute({ cardId: 'random-id', userId: user.id })

    expect(card.isLeft()).toBeTruthy()
  })

  test('should not be able to get a card with non existing user', async () => {
    const _card = await getCard.execute({
      cardId: card.id,
      userId: 'random-id',
    })

    expect(_card.isLeft()).toBeTruthy()
  })
})
