import { ZodError } from 'zod'

export class ZodValidationError extends Error {
  constructor(error?: ZodError) {
    super(
      `Field [${error?.issues?.[0].path?.[0] ?? 'Invalid data'}]: ${
        error?.issues?.[0].message ?? 'Invalid data'
      }`,
    )
    this.name = 'ZodValidationError'
  }
}
