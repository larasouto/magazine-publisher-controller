import { createBrowserRouter } from 'react-router-dom'
import { AuthRoutes } from './pages/auth.routes'
import { CategoriesRoutes } from './pages/categories.routes'
import { HomeRoutes } from './pages/home.routes'
import { PhotographersRoutes } from './pages/photographers.routes'
import { ReportersRoutes } from './pages/reporters.routes'
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
  PhotographersRoutes
  ThemesRoutes
])
