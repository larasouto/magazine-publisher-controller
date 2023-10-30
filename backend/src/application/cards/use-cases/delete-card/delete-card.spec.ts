import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
import { Card } from '../../domain/card'
import { InMemoryCardsRepository } from '../../repositories/in-memory/InMemoryCardsRepository'
import { ICardsRepository } from '../../repositories/interfaces/ICardsRepository'
import { DeleteCard } from './delete-card'
import { CardFactory } from '@/tests/factories/CardFactory'

let categoriesRepository: ICardsRepository
let deleteCard: DeleteCard

describe('Delete card', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCardsRepository()
    deleteCard = new DeleteCard(categoriesRepository)
  })

  test('should delete a card', async () => {
    const card1 = CardFactory.create()
    const card2 = CardFactory.create()

    await categoriesRepository.create(card1)
    await categoriesRepository.create(card2)

    const response = await deleteCard.execute({
      ids: [card1.id, card2.id],
    })

    expect(response.isRight()).toBeTruthy()
    expect(await categoriesRepository.list()).toStrictEqual([])
  })

  test('should not delete a non-existing card', async () => {
    const card1 = CardFactory.create()
    await categoriesRepository.create(card1)

    const response = await deleteCard.execute({
      ids: [card1.id, 'non-existing-id'],
    })

    expect(response.isLeft()).toBeTruthy()
    expect(await categoriesRepository.list()).toStrictEqual([card1])
  })
})
