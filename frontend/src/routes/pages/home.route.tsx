import { ComponentLayout } from '@/layout/ComponentLayout'
import JustForTests from '@/pages/JustForTests'
import { AuthGuard } from '@/utils/guard/AuthGuard'
import { routes } from '@routes'
import { RouteObject } from 'react-router-dom'

export const HomeRoutes: RouteObject = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <AuthGuard>
          <ComponentLayout layout="simple" />
        </AuthGuard>
      ),
      children: [
        {
          path: routes.home.index,
          element: <JustForTests />
        }
      ]
    }
  ]
}
