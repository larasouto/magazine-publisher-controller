import { Offer } from '../../domain/offer'
import { IOffersRepository } from '../../repositories/interfaces/IOffersRepository'

type ListOffersResponse = Offer[]

export class ListOffers {
  constructor(private offersRepository: IOffersRepository) {}

  async execute(): Promise<ListOffersResponse> {
    const offers = await this.offersRepository.list()
    return offers
  }
}
