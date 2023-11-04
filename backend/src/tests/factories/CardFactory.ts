import { Card } from '@/application/cards/domain/card'

type CardOverrides = {
  number?: string
  holder?: string
  expirationDate?: string
  securityCode?: string
  billingAddress?: string
  phone?: string
  type?: number
  flag?: string
  userId: string
}

export class CardFactory {
  static create(overrides?: CardOverrides) {
    const card = Card.create({
      number: '1234 5678 9012 3456',
      holder: 'test-card-holder',
      expirationDate: '02/2025',
      securityCode: '123',
      billingAddress: 'test-card-billing-address',
      phone: '(55) 9.9999-9999',
      type: 0,
      flag: 'test-card-flag',
      userId: 'test-user-id',
      ...overrides,
    })

    return card.value as Card
  }
}
