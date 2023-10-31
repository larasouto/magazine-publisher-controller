import { ComponentLayout } from '@/layout/ComponentLayout'
import { CardsTabs } from '@/pages/users/cards/cards.tabs'
import { AuthGuard } from '@/utils/guard/AuthGuard'
import { routes } from '@routes'
import { RouteObject } from 'react-router-dom'

export const CardsRoutes: RouteObject = {
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
          path: routes.profile.cards.index,
          element: <CardsTabs />
        },
        {
          path: routes.profile.cards.new,
          element: <CardsTabs defaultSelected="form" />
        },
        {
          path: routes.profile.cards.edit,
          element: <CardsTabs defaultSelected="form" />
        }
      ]
    }
  ]
}
