import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { Router } from 'express'
import { makeEnsureAuthenticated } from '../factories/controllers/auth/makeEnsureAuthenticated'
import { makeCreateSubtitlesController } from '../factories/controllers/subtitles/makeCreateSubtitleController'
import { makeDeleteSubtitlesController } from '../factories/controllers/subtitles/makeDeleteSubtitleController'
import { makeEditSubtitlesController } from '../factories/controllers/subtitles/makeEditSubtitleController'
import { makeGetSubtitleController } from '../factories/controllers/subtitles/makeGetSubtitleController'
import { makeListSubtitlesController } from '../factories/controllers/subtitles/makeListSubtitleController'

export const subtitles = Router()

subtitles.use(adaptMiddleware(makeEnsureAuthenticated()))

subtitles.post('/new', adaptRoute(makeCreateSubtitlesController()))
subtitles.put('/:subtitleId/edit', adaptRoute(makeEditSubtitlesController()))
subtitles.get('/:subtitleId', adaptRoute(makeGetSubtitleController()))
subtitles.delete('/:subtitleId', adaptRoute(makeDeleteSubtitlesController()))
subtitles.get('/', adaptRoute(makeListSubtitlesController()))
