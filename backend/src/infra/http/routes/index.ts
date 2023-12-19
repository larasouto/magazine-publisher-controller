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
import { reviews } from './reviews.routes'
import { adPrices } from './ad-prices.routes'
import { bookstore } from './bookstore.routes'
import { distributor } from './distributor.routes'
import { graphics } from './graphics.routes'
import { graphicsOrder } from './graphicsOrder.routes'
import { graphicsOrderRetur } from './graphicsOrderReturn.routes'
import { graphicsOnDistributor } from './graphicsOnDistributor.routes'
import { articles } from './articles.routes'
import { offers } from './offers.routes'
import { coupons } from './coupons.routes'
import { notifications } from './notifications.routes'

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
router.use('/editions/reviews', reviews)
router.use('/ad-prices', adPrices)
router.use('/bookstores', bookstore)
router.use('/distributor', distributor)
router.use('/graphics', graphics)
router.use('/graphicsOrders', graphicsOrder)
router.use('/graphicsOrderReturn', graphicsOrderRetur)
router.use('/graphicsOnDistributor', graphicsOnDistributor)
router.use('/articles', articles)
router.use('/offers', offers)
router.use('/coupons', coupons)
router.use('/notifications', notifications)
