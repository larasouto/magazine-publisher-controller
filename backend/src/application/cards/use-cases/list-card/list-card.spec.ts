import { beforeEach, describe, expect, test } from 'vitest'
import { Card } from '../../domain/card'
import { InMemoryCardsRepository } from '../../repositories/in-memory/InMemoryCardsRepository'
import { ICardsRepository } from '../../repositories/interfaces/ICardsRepository'
import { CreateCard } from '../create-card/create-card'
import { ListCards } from './list-card'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'
import { UserFactory } from '@/tests/factories/UserFactory'

let listCards: ListCards
let createCard: CreateCard
let cardsRepository: ICardsRepository
let usersRepository: IUsersRepository

describe('List cards', () => {
  beforeEach(() => {
    cardsRepository = new InMemoryCardsRepository()
    usersRepository = new InMemoryUsersRepository()
    listCards = new ListCards(cardsRepository)
    createCard = new CreateCard(cardsRepository, usersRepository)
  })

  test('should list all cards', async () => {
    const user = UserFactory.create()
    await usersRepository.create(user)

    const data1 = {
      number: '1234567890123456',
      holder: 'John Doe',
      expirationDate: '01/2025',
      securityCode: '123',
      billingAddress: 'test-billing-address',
      phone: '(55) 9.9999-9999',
      type: 0,
      flag: 'test-flag',
      userId: user.id,
    }

    const data2 = {
      number: '1234567890123456',
      holder: 'Mary Doe',
      expirationDate: '01/2025',
      securityCode: '123',
      billingAddress: 'test-billing-address',
      phone: '(55) 9.9999-9999',
      type: 0,
      flag: 'test-flag',
      userId: user.id,
    }

    const response1 = await createCard.execute(data1)
    const card1 = response1.value as Card

    const response2 = await createCard.execute(data2)
    const card2 = response2.value as Card

    expect(card1).toBeTruthy()
    expect(await cardsRepository.findById(card1.id)).toBeTruthy()

    expect(card2).toBeTruthy()
    expect(await cardsRepository.findById(card2.id)).toBeTruthy()

    const response = await listCards.execute()
    expect(response.length).toBe(2)

    expect(response[0].props.holder).toBe(card1.props.holder)
    expect(response[1].props.holder).toBe(card2.props.holder)
  })

  test('should return an empty list if no cards exist', async () => {
    const response = await listCards.execute()
    expect(response.length).toBe(0)
  })
})
