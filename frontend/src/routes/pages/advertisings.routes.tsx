import { ComponentLayout } from '@/layout/ComponentLayout'
import { AdvertisingViewPage } from '@/pages/advertisings/admin/advertisings'
import { AdvertisingsAdminListPage } from '@/pages/advertisings/admin/advertisings.list'
import { AdvertisingPage } from '@/pages/advertisings/user/advertisings'
import { AdvertisingsUserListPage } from '@/pages/advertisings/user/advertisings.list'
import { AdvertisingViewUserPage } from '@/pages/advertisings/user/view/advertisings'
import { AdvertisingsPayment } from '@/pages/products/advertisings/advertisings.form'
import { AdvertisingPaymentListPage } from '@/pages/products/advertisings/advertisings.list'
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
          element: <AdvertisingsUserListPage />
        },
        {
          path: routes.advertisings.new,
          element: <AdvertisingPage />
        },
        {
          path: routes.advertisings.edit,
          element: <AdvertisingPage />
        },
        {
          path: routes.advertisings.view,
          element: <AdvertisingViewUserPage />
        },
        {
          path: routes.advertisings.payment,
          element: <AdvertisingsPayment />
        },
        {
          path: routes.advertisings.admin.index,
          element: <AdvertisingsAdminListPage />
        },
        {
          path: routes.advertisings.admin.status_update,
          element: <AdvertisingViewPage />
        },
        {
          path: routes.advertisings.payment_list,
          element: <AdvertisingPaymentListPage />
        }
      ]
    }
  ]
}
