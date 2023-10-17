import { ComponentLayout } from '@/layout/ComponentLayout'
import { AdvertisementsPage } from '@/pages/advertisements/advertisements'
import { AdvertisementsListPage } from '@/pages/advertisements/advertisements.list'
import { AuthGuard } from '@/utils/guard/AuthGuard'
import { routes } from '@routes'
import { RouteObject } from 'react-router-dom'

export const AdvertisementsRoutes: RouteObject = {
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
          path: routes.advertisements.index,
          element: <AdvertisementsListPage />
        },
        {
          path: routes.advertisements.new,
          element: <AdvertisementsPage />
        },
        {
          path: routes.advertisements.edit,
          element: <AdvertisementsPage />
        }
      ]
    }
  ]
}
