export class InvalidJWTTokenError extends Error {
  constructor() {
    super(`The JWT token is invalid.`)
    this.name = 'InvalidJWTTokenError'
  }
}
