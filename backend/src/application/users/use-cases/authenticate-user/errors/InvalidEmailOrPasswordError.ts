import { t } from 'i18next'

export class InvalidEmailOrPasswordError extends Error {
  constructor() {
    super(t('account.invalid_email_or_password'))
    this.name = 'InvalidEmailOrPassword'
  }
}
