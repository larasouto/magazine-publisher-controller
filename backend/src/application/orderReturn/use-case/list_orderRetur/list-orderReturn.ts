import { OrderReturn } from '../../domain/orderReturn'
import { IOrderReturnRepository } from '../../repositories/interfaces/IOrderReturnRepository'

type ListOrderReturnResponse = OrderReturn[]

export class ListOrderReturn {
  constructor(private orderReturnRepository: IOrderReturnRepository) {}

  async execute(): Promise<ListOrderReturnResponse> {
    const orderReturn = await this.orderReturnRepository.list()
    const filteredOrderReturn = orderReturn.filter(
      (item) => item !== null,
    ) as OrderReturn[]
    return filteredOrderReturn
  }
}
