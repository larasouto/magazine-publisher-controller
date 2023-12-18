import { Offer } from '@/application/offers/domain/offer'

export interface IOffersRepository {
  findById(id: string): Promise<Offer | null>
  create(offer: Offer, editions: string[]): Promise<void>
  update(offer: Offer, editions: string[]): Promise<void>
  deleteMany(ids: string[]): Promise<void>
  list(): Promise<Offer[]>
  exists(id: string): Promise<boolean>
}
