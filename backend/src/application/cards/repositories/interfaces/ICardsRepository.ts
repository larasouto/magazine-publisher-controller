import { Card } from '../../domain/card'

export interface ICardsRepository {
  findById(id: string): Promise<Card | null>
  create(card: Card): Promise<void>
  update(card: Card): Promise<void>
  deleteMany(ids: string[]): Promise<void>
  list(userId: string): Promise<Card[]>
}
