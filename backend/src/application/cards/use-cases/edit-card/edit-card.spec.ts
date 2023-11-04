import { beforeAll, describe, expect, test } from 'vitest'
import { InMemoryCardsRepository } from '../../repositories/in-memory/InMemoryCardsRepository'
import { ICardsRepository } from '../../repositories/interfaces/ICardsRepository'
import { EditCard } from './edit-card'
import { CardFactory } from '@/tests/factories/CardFactory'
import { Card } from '../../domain/card'
import { UserFactory } from '@/tests/factories/UserFactory'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { User } from '@/application/users/domain/user'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'

let cardsRepository: ICardsRepository
let editCard: EditCard
let card: Card
let usersRepository: IUsersRepository
let user: User

describe('Edit a card', () => {
  beforeAll(async () => {
    cardsRepository = new InMemoryCardsRepository()
    usersRepository = new InMemoryUsersRepository()
    editCard = new EditCard(cardsRepository, usersRepository)
    user = UserFactory.create()
    await usersRepository.create(user)

    card = CardFactory.create({ userId: user.id })
    await cardsRepository.create(card)
  })

  test('should be able to update a card', async () => {
    const updatedCard = await editCard.execute({
      cardId: card.id,
      number: '0987654321098765',
      holder: 'test-updated-holder',
      expirationDate: '01/2025',
      securityCode: '321',
      billingAddress: 'test-updated-billing-address',
      phone: '(55) 9.9999-9999',
      type: 0,
      flag: 'test-updated-flag',
      userId: user.id,
    })

    expect(updatedCard.isRight()).toBeTruthy()

    const sub = await cardsRepository.findById(card.id)
    expect(sub).toEqual(updatedCard.value)
  })

  test('should not be able to update a card with invalid data', async () => {
    card = CardFactory.create()

    await cardsRepository.create(card)
    expect(await cardsRepository.findById(card.id)).toBeTruthy()

    const updatedCard = await editCard.execute({
      cardId: card.id,
      number: '',
      holder: '',
      expirationDate: '',
      securityCode: '',
      billingAddress: '',
      phone: '',
      type: 0,
      flag: '',
      userId: '',
    })

    expect(updatedCard.isLeft()).toBeTruthy()
  })
})
