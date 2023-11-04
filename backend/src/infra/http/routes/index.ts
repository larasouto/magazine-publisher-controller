import { Router } from 'express'
import { auth } from './auth.routes'
import { categories } from './categories.routes'
import { magazines } from './magazines.routes'
import { photographers } from './photographer.routes'
import { reporters } from './reporters.routes'
import { subscriptions } from './subscriptions.routes'
import { themes } from './themes.routes'
import { subtitles } from './subtitles.routes'
import { editions } from './editions.routes'
import { addresses } from './addresses.routes'
import { cards } from './cards.routes'
import { orders } from './orders.routes'
import { advertisings } from './advertisings.routes'
import { payments } from './payment-subscriptions.routes'
import { paymentsAd } from './payment-advertisings.routes'
import { coupons } from './coupons.routes'

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
router.use('/advertisings', advertisings)
router.use('/payment-subscriptions', payments)
router.use('/payment-advertisings', paymentsAd)
router.use('/coupons', coupons)
