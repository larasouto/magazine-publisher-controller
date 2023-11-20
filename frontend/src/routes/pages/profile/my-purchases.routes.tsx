import { ComponentLayout } from '@/layout/ComponentLayout'
import { MyPurchasesPage } from '@/pages/users/purchases/my-purchases'
import { AuthGuard } from '@/utils/guard/AuthGuard'
import { routes } from '@routes'
import { RouteObject } from 'react-router-dom'

export const MyPurchasesRoutes: RouteObject = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <AuthGuard>
          <ComponentLayout layout="profile" />
        </AuthGuard>
      ),
      children: [
        {
          path: routes.profile['my-purchases'].index,
          element: <MyPurchasesPage />
        }
      ]
    }
  ]
}
