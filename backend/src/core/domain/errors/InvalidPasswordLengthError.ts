export class InvalidPasswordLengthError extends Error {
  constructor() {
    super(`The password must be between 6 and 255 characters`)
    this.name = 'InvalidPasswordLengthError'
  }
}
