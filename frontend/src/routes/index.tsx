import { UserDetailsProvider } from '@/contexts/user-details-provider'
import { createBrowserRouter } from 'react-router-dom'
import { AdPricesRoutes } from './pages/ad-prices.routes'
import { AdvertisingsRoutes } from './pages/advertisings.routes'
import { AuthRoutes } from './pages/auth.routes'
import { HomeRoutes } from './pages/home.routes'
import { PhotographersRoutes } from './pages/photographers.routes'
import { CategoriesRoutes } from './pages/product/categories.routes'
import { EditionsRoutes } from './pages/product/editions.routes'
import { MagazineRoutes } from './pages/product/magazine.routes'
import { OrdersRoutes } from './pages/product/orders.routes'
import { ThemesRoutes } from './pages/product/themes.routes'
import { AddressesRoutes } from './pages/profile/addresses.routes'
import { CardsRoutes } from './pages/profile/cards.routes'
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
      AdvertisingsRoutes
    ]
  }
])
