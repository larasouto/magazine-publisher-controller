import { Request, Response, NextFunction } from 'express'
import i18next from 'i18next'

export const checkLanguage = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const language = req.headers['accept-language'] || 'en-US'
  i18next.changeLanguage(language)
  next()
}
