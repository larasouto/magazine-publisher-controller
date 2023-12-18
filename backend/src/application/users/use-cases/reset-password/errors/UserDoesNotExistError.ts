export class UserDoesNotExistError extends Error {
  constructor() {
    super('Usuário não existe')
    this.name = 'UserDoesNotExistError'
  }
}
