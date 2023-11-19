import { AdPrice } from '../../domain/ad-price'

export interface IAdPricesRepository {
  findById(id: string): Promise<AdPrice | null>
  findByMagazineId(id: string): Promise<AdPrice | null>
  list(): Promise<AdPrice[]>
  create(advertising: AdPrice): Promise<void>
  update(advertising: AdPrice): Promise<void>
  deleteMany(ids: string[]): Promise<void>
}
