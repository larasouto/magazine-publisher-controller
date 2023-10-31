import { Router } from 'express'
import { auth } from './auth.routes'
import { categories } from './categories.routes'
import { magazines } from './magazines.routes'
import { photographers } from './photographer.routes'
import { reporters } from './reporters.routes'
import { themes } from './themes.routes'
import { subtitles } from './subtitles.routes'
import { editions } from './editions.routes'
import { subscriptions } from './subscriptions.routes'
import { addresses } from './addresses.routes'
import { cards } from './cards.routes'
import { orders } from './orders.routes'
import { advertisings } from './advertisings.routes'

export const router = Router()

router.use('/auth', auth)
router.use('/categories', categories)
router.use('/magazines/themes', themes)
router.use('/reporters', reporters)
router.use('/photographers', photographers)
router.use('/magazines', magazines)
router.use('/editions/subtitles', subtitles)
router.use('/editions', editions)
router.use('/subscriptions', subscriptions)
router.use('/addresses', addresses)
router.use('/cards', cards)
router.use('/orders', orders)
router.use('advertisings', advertisings)
