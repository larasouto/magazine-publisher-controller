import { createBrowserRouter } from 'react-router-dom'
import { AuthRoutes } from './pages/auth.route'
import { HomeRoutes } from './pages/home.route'

/**
 * Criação do 'roteador' da aplicação, responsável por gerenciar
 * as rotas da aplicação.
 */
export const router = createBrowserRouter([AuthRoutes, HomeRoutes])
