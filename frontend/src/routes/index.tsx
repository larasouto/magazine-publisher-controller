import { UserDetailsProvider } from '@/contexts/user-details-provider'
import { createBrowserRouter } from 'react-router-dom'
import { AdPricesRoutes } from './pages/ad-prices.routes'
import { AdvertisingsRoutes } from './pages/advertisings.routes'
import { ArticlesRoutes } from './pages/articles.routes'
import { AuthRoutes } from './pages/auth.routes'
import { BookstoresRoutes } from './pages/bookstores.routes'
import { CouponsRoutes } from './pages/coupons.routes'
import { DistributorRoutes } from './pages/distributor.routes'
import { GraphicsRoutes } from './pages/graphics.routes'
import { GraphocsOnDistributorsRoutes } from './pages/graphicsOnDistributor.routes'
import { GraphicsOrdersRoutes } from './pages/grapihcsOrders.routes'
import { GraphicsOrdersReturnsRoutes } from './pages/grapihcsOrdersReturns.routes'
import { HomeRoutes } from './pages/home.routes'
import { OffersRoutes } from './pages/offers.routes'
import { PhotographersRoutes } from './pages/photographers.routes'
import { CategoriesRoutes } from './pages/product/categories.routes'
import { EditionsRoutes } from './pages/product/editions.routes'
import { MagazineRoutes } from './pages/product/magazine.routes'
import { OrdersRoutes } from './pages/product/orders.routes'
import { ThemesRoutes } from './pages/product/themes.routes'
import { AddressesRoutes } from './pages/profile/addresses.routes'
import { CardsRoutes } from './pages/profile/cards.routes'
import { MyPurchasesRoutes } from './pages/profile/my-purchases.routes'
import { MySubscriptionRoutes } from './pages/profile/my-subscriptions.routes'
import { ReportersRoutes } from './pages/reporters.routes'
import { SubscriptionRoutes } from './pages/subscriptions.routes'

/**
 * Criação do 'roteador' da aplicação, responsável por gerenciar
 * as rotas da aplicação.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <UserDetailsProvider />,
    children: [
      AuthRoutes,
      HomeRoutes,
      CategoriesRoutes,
      ReportersRoutes,
      PhotographersRoutes,
      ThemesRoutes,
      MagazineRoutes,
      EditionsRoutes,
      SubscriptionRoutes,
      AddressesRoutes,
      CardsRoutes,
      OrdersRoutes,
      AdvertisingsRoutes,
      BookstoresRoutes,
      GraphicsRoutes,
      DistributorRoutes,
      GraphocsOnDistributorsRoutes,
      GraphicsOrdersRoutes,
      GraphicsOrdersReturnsRoutes,
      ArticlesRoutes,
      AdPricesRoutes,
      MyPurchasesRoutes,
      MySubscriptionRoutes,
      OffersRoutes,
      CouponsRoutes
    ]
  }
])
