import { t } from 'i18next'

export class UserNotFoundError extends Error {
  constructor() {
    super(t('user.not_found'))
    this.name = 'UserNotFoundError'
  }
}
