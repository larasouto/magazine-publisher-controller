export class NotificationNotFoundError extends Error {
  constructor() {
    super('Notificação não encontrada')
    this.name = 'NotificationNotFoundError'
  }
}
