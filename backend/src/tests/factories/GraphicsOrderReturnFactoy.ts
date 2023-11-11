import { GraphicsOrderReturn } from "@/application/orderReturn/domain/graphicsOrderReturn"

type GraphicsOrderReturnOverrides = {
  returnDate?: Date
  returnNumber?: number
  graphicsOrderId: string
}

export class GraphicsOrderReturnFactory {
  static create(overrides?: GraphicsOrderReturnOverrides) {
    const graphics = GraphicsOrderReturn.create({
      returnDate: new Date(),
      returnNumber: 12,
      graphicsOrderId: 'graphicsOrder.id',
      ...overrides,
    })

    return graphics.value as GraphicsOrderReturn
  }
}
