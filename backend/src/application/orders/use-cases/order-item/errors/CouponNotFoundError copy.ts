import { t } from 'i18next'

export class CouponNotFoundError extends Error {
  constructor() {
    super(t('coupon.not_found'))
    this.name = 'CouponNotFoundError'
  }
}
