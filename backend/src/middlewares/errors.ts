import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export const errors = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof Error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: 'error',
      message: err.message
    })
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'Internal server error'
  })
}
