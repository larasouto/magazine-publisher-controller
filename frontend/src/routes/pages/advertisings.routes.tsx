import { ComponentLayout } from '@/layout/ComponentLayout'
import { AdvertisingPage } from '@/pages/advertisings/advertisings'
import { AdvertisingsListPage } from '@/pages/advertisings/advertisings.list'
import { AuthGuard } from '@/utils/guard/AuthGuard'
import { routes } from '@routes'
import { RouteObject } from 'react-router-dom'

export const AdvertisingsRoutes: RouteObject = {
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
          path: routes.advertisings.index,
          element: <AdvertisingsListPage />
        },
        {
          path: routes.advertisings.new,
          element: <AdvertisingPage />
        },
        {
          path: routes.advertisings.edit,
          element: <AdvertisingPage />
        }
        /*
        {
          path: routes.advertisings.payment,
          element: <AdvertisingsPayment />
        },
        {
          path: routes.advertisings.payment_list,
          element: <AdvertisingPaymentListPage />
        }
        */
      ]
    }
  ]
}
