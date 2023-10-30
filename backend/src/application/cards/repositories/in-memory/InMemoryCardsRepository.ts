import { Card } from '../../domain/card'
import { ICardsRepository } from '../interfaces/ICardsRepository'

export class InMemoryCardsRepository implements ICardsRepository {
  constructor(public cards: Card[] = []) {}

  async findById(id: string): Promise<Card | null> {
    const card = this.cards.find((card) => card.id === id)

    if (!card) {
      return null
    }

    return card
  }

  async create(card: Card): Promise<void> {
    this.cards.push(card)
  }

  async deleteMany(ids: string[]): Promise<void> {
    ids.forEach((id) => {
      const cardIndex = this.cards.findIndex((card) => card.id === id)

      this.cards.splice(cardIndex, 1)
    })
  }

  async update(card: Card): Promise<void> {
    const cardIndex = this.cards.findIndex((card) => card.id === card.id)

    this.cards[cardIndex] = card
  }

  async list(): Promise<Card[]> {
    return this.cards
  }
}
