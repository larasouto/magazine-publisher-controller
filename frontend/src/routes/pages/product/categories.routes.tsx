import { ComponentLayout } from '@/layout/ComponentLayout'
import { CategoriesPage } from '@/pages/categories/categories'
import { CategoryListPage } from '@/pages/categories/categories.list'
import { AuthGuard } from '@/utils/guard/AuthGuard'
import { routes } from '@routes'
import { RouteObject } from 'react-router-dom'

export const CategoriesRoutes: RouteObject = {
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
          path: routes.categories.index,
          element: <CategoryListPage />
        },
        {
          path: routes.categories.new,
          element: <CategoriesPage />
        },
        {
          path: routes.categories.edit,
          element: <CategoriesPage />
        }
      ]
    }
  ]
}
