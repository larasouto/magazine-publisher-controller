export class SubscriptionNotFoundError extends Error {
  constructor() {
    super('Assinatura não encontrada')
    this.name = 'SubscriptionNotFoundError'
  }
}
