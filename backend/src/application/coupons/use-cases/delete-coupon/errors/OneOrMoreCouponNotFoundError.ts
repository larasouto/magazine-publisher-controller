import { t } from 'i18next'

export class OneOrMoreCouponNotFoundError extends Error {
  constructor() {
    super(t('coupon.one_or_more_not_found'))
    this.name = 'OneOrMoreCouponNotFoundError'
  }
}
