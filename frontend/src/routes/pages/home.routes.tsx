import { ComponentLayout } from '@/layout/ComponentLayout'
import { HomePage } from '@/pages/home/home'
import { MagazineShow } from '@/pages/home/magazines/magazines.show'
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
          element: <HomePage />
        },
        {
          path: routes.home.magazines,
          element: <MagazineShow />
        }
      ]
    }
  ]
}
