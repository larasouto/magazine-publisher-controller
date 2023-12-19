export class AddressNotFoundError extends Error {
  constructor() {
    super('Endereço não encontrado')
    this.name = 'AddressNotFoundError'
  }
}
