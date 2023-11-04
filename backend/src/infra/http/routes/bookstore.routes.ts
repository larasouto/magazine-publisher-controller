import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeCreateBookstoresController } from '../factories/controllers/bookstore/makeCreateBookstoreController'
import { makeDeleteBookstoresController } from '../factories/controllers/bookstore/makeDeleteBookstoreController'
import { makeEditBookstoresController } from '../factories/controllers/bookstore/makeEditBookstoreController'

export const bookstore = Router()

bookstore.use(adaptMiddleware(makeEnsureAuthenticated()))

bookstore.post('/new', adaptRoute(makeCreateBookstoresController()))
bookstore.put('/:bookstoreId/edit', adaptRoute(makeEditBookstoresController()))
//bookstore.get('/:themeId', adaptRoute(makeGetThemeController()))
bookstore.delete('/:bookstoreId', adaptRoute(makeDeleteBookstoresController()))
//bookstore.get('/', adaptRoute(makeListThemesController()))
