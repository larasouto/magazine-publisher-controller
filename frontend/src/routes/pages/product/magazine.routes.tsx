import { ComponentLayout } from '@/layout/ComponentLayout'
import { MagazinePage } from '@/pages/magazines/magazines'
import { MagazinesListPage } from '@/pages/magazines/magazines.list'
import { AuthGuard } from '@/utils/guard/AuthGuard'
import { routes } from '@routes'
import { RouteObject } from 'react-router-dom'

export const MagazineRoutes: RouteObject = {
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
          path: routes.magazines.index,
          element: <MagazinesListPage />
        },
        {
          path: routes.magazines.new,
          element: <MagazinePage />
        },
        {
          path: routes.magazines.edit,
          element: <MagazinePage />
        }
      ]
    }
  ]
}
