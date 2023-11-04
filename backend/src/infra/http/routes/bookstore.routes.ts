import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeCreateBookstoresController } from '../factories/controllers/bookstore/makeCreateBookstoreController'

export const bookstore = Router()

bookstore.use(adaptMiddleware(makeEnsureAuthenticated()))

bookstore.post('/new', adaptRoute(makeCreateBookstoresController()))
//bookstore.put('/:themeId/edit', adaptRoute(makeEditThemesController()))
//bookstore.get('/:themeId', adaptRoute(makeGetThemeController()))
//bookstore.delete('/:themeId', adaptRoute(makeDeleteThemesController()))
//bookstore.get('/', adaptRoute(makeListThemesController()))
