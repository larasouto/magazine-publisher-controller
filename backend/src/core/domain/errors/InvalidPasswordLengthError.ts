import { t } from 'i18next'

export class InvalidPasswordLengthError extends Error {
  constructor() {
    super(t('errors.jwt_password_length'))
    this.name = 'InvalidPasswordLengthError'
  }
}
