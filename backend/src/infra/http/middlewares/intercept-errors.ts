import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ZodError } from 'zod'

export const interceptErrors = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ZodError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: 'error',
      message: err.issues?.[0].message,
    })
  }
  if (err instanceof Error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: 'error',
      message: err.message,
    })
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'Internal server error',
  })
}
