import { t } from 'i18next'

export class BookstoreNotFoundError extends Error {
  constructor() {
    super(t('bookstore.not_found'))
    this.name = 'BookstoreNotFoundError'
  }
}
