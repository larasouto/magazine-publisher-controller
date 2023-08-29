import { NextFunction, Request, Response } from 'express'
import i18next from 'i18next'

export const lang = (req: Request, _res: Response, next: NextFunction) => {
  const language = req.headers['accept-language'] || 'en-US'
  i18next.changeLanguage(language)
  next()
}
