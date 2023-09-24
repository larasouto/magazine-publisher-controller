import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeCreateCategoriesController } from '../factories/controllers/categories/makeCreateCategoriesController'
import { makeEditCategoriesController } from '../factories/controllers/categories/makeEditCategoriesController'

export const categories = Router()

categories.use(adaptMiddleware(makeEnsureAuthenticated()))

categories.post('/new', adaptRoute(makeCreateCategoriesController()))
categories.put('/:categoryId/edit', adaptRoute(makeEditCategoriesController()))
