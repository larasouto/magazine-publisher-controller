import { Router } from 'express'
import { auth } from './auth.routes'
import { categories } from './categories.routes'
import { magazines } from './magazines.routes'
import { photographers } from './photographer.routes'
import { reporters } from './reporters.routes'
import { themes } from './themes.routes'
import { subtitles } from './subtitles.routes'
import { editions } from './editions.routes'
import { graphics } from './graphics.routes'
import { distributor } from './distributor.routes'
import { order } from './order.routes'
import { orderRetur } from './orderReturn.routes'
import { bookstore } from './bookstore.routes'

export const router = Router()

router.use('/auth', auth)
router.use('/categories', categories)
router.use('/themes', themes)
router.use('/reporters', reporters)
router.use('/photographers', photographers)
router.use('/magazines', magazines)
router.use('/editions/subtitles', subtitles)
router.use('/editions', editions)
router.use('/graphics', graphics)
router.use('/distributor', distributor)
router.use('/order', order)
router.use('/orderReturn', orderRetur)
router.use('/bookstore', bookstore)
