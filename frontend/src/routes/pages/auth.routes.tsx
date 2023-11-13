import { ComponentLayout } from '@/layout/ComponentLayout'
import { GuestGuard } from '@/utils/guard'
import { routes } from '@routes'
import { RouteObject } from 'react-router-dom'

import SignIn from '@/pages/auth/sign-in/sign-in'
import SignUp from '@/pages/auth/sign-up/sign-up'

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
          path: '/',
          element: <SignIn />
        },
        {
          path: routes.auth.sign_in.index,
          element: <SignIn />
        },
        {
          path: routes.auth.sign_up.index,
          element: <SignUp />
        }
      ]
    }
  ]
}
