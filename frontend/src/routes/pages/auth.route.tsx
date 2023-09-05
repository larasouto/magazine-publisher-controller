import { ComponentLayout } from '@/layout/ComponentLayout'
import { routes } from '@routes'
import { RouteObject } from 'react-router-dom'

import SignIn from '@/pages/auth/sign-in/sign-in'
import SignUp from '@/pages/auth/sign-up/sign-up'
import { GuestGuard } from '@/utils/guard'
import AddEdit from '@/pages/auth/add-edit/add-edit'

export const AuthRoutes: RouteObject = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <GuestGuard>
          <ComponentLayout layout="auth" />
        </GuestGuard>
      ),
      children: [
        {
          path: routes.auth.sign_in.index,
          element: <SignIn />
        },
        {
          path: routes.auth.sign_up.index,
          element: <SignUp />
        },
        {
          path: routes.auth.Add_Edit.index,
          element: <AddEdit />
        }
      ]
    }
  ]
}
