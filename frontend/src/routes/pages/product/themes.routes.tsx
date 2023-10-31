import { ComponentLayout } from '@/layout/ComponentLayout'
import { ThemesPage } from '@/pages/themes/themes'
import { ThemesListPage } from '@/pages/themes/themes.list'
import { AuthGuard } from '@/utils/guard'
import { RouteObject } from 'react-router-dom'
import { routes } from '../../routes'

export const ThemesRoutes: RouteObject = {
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
          path: routes.themes.index,
          element: <ThemesListPage />
        },
        {
          path: routes.themes.new,
          element: <ThemesPage />
        },
        {
          path: routes.themes.edit,
          element: <ThemesPage />
        }
      ]
    }
  ]
}
