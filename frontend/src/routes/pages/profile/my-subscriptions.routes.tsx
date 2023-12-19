import { ComponentLayout } from '@/layout/ComponentLayout'
import { MySubscriptionPage } from '@/pages/users/subscriptions/my-subscriptions'
import { AuthGuard } from '@/utils/guard/AuthGuard'
import { routes } from '@routes'
import { RouteObject } from 'react-router-dom'

export const MySubscriptionRoutes: RouteObject = {
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
          path: routes.profile['my-subscriptions'].index,
          element: <MySubscriptionPage />
        }
      ]
    }
  ]
}
