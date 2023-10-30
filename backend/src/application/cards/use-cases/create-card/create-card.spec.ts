import { beforeEach, describe, expect, test } from 'vitest'
import { Card } from '../../domain/card'
import { InMemoryCardsRepository } from '../../repositories/in-memory/InMemoryCardsRepository'
import { ICardsRepository } from '../../repositories/interfaces/ICardsRepository'
import { CreateCard } from './create-card'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'
import { UserFactory } from '@/tests/factories/UserFactory'

let cardsRepository: ICardsRepository
let createCard: CreateCard
let usersRepository: IUsersRepository

describe('Create a card', () => {
  beforeEach(() => {
    cardsRepository = new InMemoryCardsRepository()
    usersRepository = new InMemoryUsersRepository()
    createCard = new CreateCard(cardsRepository, usersRepository)
  })

  test('should be able to create a card', async () => {
    const user = UserFactory.create()
    await usersRepository.create(user)

    const data: any = {
      number: '1234567890123456',
      holder: 'test-card-holder',
      expirationDate: '01/2025',
      securityCode: 123,
      billingAddress: 'test-billing-address',
      phone: '(55) 9.9999-9999',
      type: 0,
      flag: 'test-flag',
      userId: user.id,
    }

    const response = await createCard.execute(data)
    const card = response.value as Card

    expect(card).toBeTruthy()
    expect(await cardsRepository.findById(card.id)).toBeTruthy()
  })

  test('should not be able to create a card with empty data', async () => {
    const data: any = {}

    const response = await createCard.execute(data)
    expect(response.isLeft()).toBeTruthy()
  })
})
