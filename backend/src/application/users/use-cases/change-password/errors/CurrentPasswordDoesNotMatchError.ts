export class CurrentPaswordDoesNotMatchError extends Error {
  constructor() {
    super('Senha atual não confere')
    this.name = 'CurrentPaswordDoesNotMatchError'
  }
}
