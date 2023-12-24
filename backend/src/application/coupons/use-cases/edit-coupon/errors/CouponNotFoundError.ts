export class CouponNotFoundError extends Error {
  constructor() {
    super('Cupom não encontrado')
    this.name = 'CouponNotFoundError'
  }
}
