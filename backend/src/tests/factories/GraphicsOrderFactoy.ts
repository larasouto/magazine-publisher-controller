import { GraphicsOrder } from "@/application/graphicsOrder/domain/graphicsOrder"
import { Status } from "@/application/graphicsOrder/domain/graphicsOrder.schema"

type GraphicsOrderOverrides = {
  receiptDate?: Date
  departureDate?: Date
  status?: Status
  deliveryAddress?: string
  exampleNumber?: number
  price?: number
  editionId?: string
  graphicsDistributorId?: string
  bookstoreId?: string
}

export class GraphicsOrderFactory {
  static create(overrides?: GraphicsOrderOverrides) {
    const graphics = GraphicsOrder.create({
      receiptDate: new Date(),
      departureDate: new Date(),
      status: Status.inPreparation,
      deliveryAddress: 'address',
      exampleNumber: 12,
      editionId: 'edition.id',
      graphicsDistributorId: 'graphicsOnDistributor.id',
      price: 12,
      bookstoreId: 'bookstore.id',
      ...overrides,
    })

    return graphics.value as GraphicsOrder
  }
}
