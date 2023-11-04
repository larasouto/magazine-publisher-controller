import { ComponentLayout } from '@/layout/ComponentLayout'
import { AddressesTabs } from '@/pages/users/addresses/addresses.tabs'
import { AuthGuard } from '@/utils/guard/AuthGuard'
import { routes } from '@routes'
import { RouteObject } from 'react-router-dom'

export const AddressesRoutes: RouteObject = {
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
          path: routes.profile.addresses.index,
          element: <AddressesTabs />
        },
        {
          path: routes.profile.addresses.new,
          element: <AddressesTabs defaultSelected="form" />
        },
        {
          path: routes.profile.addresses.edit,
          element: <AddressesTabs defaultSelected="form" />
        }
      ]
    }
  ]
}
