import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeCreateArticlesController } from '../factories/controllers/articles/makeCreateArticlesController'
import { makeEditArticlesController } from '../factories/controllers/articles/makeEditArticlesController'
import { makeDeleteArticlesController } from '../factories/controllers/articles/makeDeleteArticlesCOntroller'
import { makeListArticlesController } from '../factories/controllers/articles/makeListArticlesController'
import { makeGetArticleController } from '../factories/controllers/articles/makeGetArticleController'

export const articles = Router()

articles.use(adaptMiddleware(makeEnsureAuthenticated()))

articles.post('/new', adaptRoute(makeCreateArticlesController()))
articles.post('/:articleId/edit', adaptRoute(makeEditArticlesController()))
articles.delete('/:articleId', adaptRoute(makeDeleteArticlesController()))
articles.get('/', adaptRoute(makeListArticlesController()))
articles.get('/:articleId', adaptRoute(makeGetArticleController()))
