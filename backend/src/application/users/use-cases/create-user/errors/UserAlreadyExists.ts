import { t } from 'i18next'

export class UserAlreadyExists extends Error {
  constructor() {
    super(t('account.already_exists'))
    this.name = 'UserAlreadyExists'
  }
}
