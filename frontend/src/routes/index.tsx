import { createBrowserRouter } from 'react-router-dom'
import { AuthRoutes } from './pages/auth.routes'
import { CategoriesRoutes } from './pages/categories.routes'
import { EditionsRoutes } from './pages/editions.routes'
import { HomeRoutes } from './pages/home.routes'
import { MagazineRoutes } from './pages/magazine.routes'
import { PhotographersRoutes } from './pages/photographers.routes'
import { AddressesRoutes } from './pages/profile/addresses.routes'
import { CardsRoutes } from './pages/profile/cards.routes'
import { ReportersRoutes } from './pages/reporters.routes'
import { SubscriptionRoutes } from './pages/subscriptions.routes'
import { ThemesRoutes } from './pages/themes.routes'

/**
 * Criação do 'roteador' da aplicação, responsável por gerenciar
 * as rotas da aplicação.
 */
export const router = createBrowserRouter([
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
  CardsRoutes
])
