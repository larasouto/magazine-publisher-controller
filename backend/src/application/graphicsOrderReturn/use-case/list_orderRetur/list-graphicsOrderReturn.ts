import { GraphicsOrderReturn } from "../../domain/graphicsOrderReturn"
import { IGraphicsOrderReturnRepository } from "../../repositories/interfaces/IGraphicsOrderReturnRepository"

type ListGraphicsOrderReturnResponse = GraphicsOrderReturn[]

export class ListGraphicsOrderReturn {
  constructor(private orderReturnRepository: IGraphicsOrderReturnRepository) {}

  async execute(): Promise<ListGraphicsOrderReturnResponse> {
    const orderReturn = await this.orderReturnRepository.list()
    const filteredGraphicsOrderReturn = orderReturn.filter(
      (item) => item !== null,
    ) as GraphicsOrderReturn[]
    return filteredGraphicsOrderReturn
  }
}
