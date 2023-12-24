export class OneOrMoreCouponNotFoundError extends Error {
  constructor() {
    super('Um ou mais cupons não encontrados')
    this.name = 'OneOrMoreCouponNotFoundError'
  }
}
