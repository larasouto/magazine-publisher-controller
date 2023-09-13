import { t } from 'i18next'

export class InvalidJWTTokenError extends Error {
  constructor() {
    super(t('errors.invalid_jwt_token'))
    this.name = 'InvalidJWTTokenError'
  }
}
