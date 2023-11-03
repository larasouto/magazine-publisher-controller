import { ComponentLayout } from '@/layout/ComponentLayout'
import { SubscriptionPage } from '@/pages/subscriptions/subscriptions'
import { SubscriptionsListPage } from '@/pages/subscriptions/subscriptions.list'
import { AuthGuard } from '@/utils/guard/AuthGuard'
import { routes } from '@routes'
import { RouteObject } from 'react-router-dom'

export const SubscriptionRoutes: RouteObject = {
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
          path: routes.subscriptions.index,
          element: <SubscriptionsListPage />
        },
        {
          path: routes.subscriptions.new,
          element: <SubscriptionPage />
        },
        {
          path: routes.subscriptions.edit,
          element: <SubscriptionPage />
        }
      ]
    }
  ]
}
