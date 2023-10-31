import { Cart } from '@/components/ui/cart/Cart'
import { Outlet } from 'react-router-dom'
import { AuthHeader } from './auth/AuthHeader'
import { Header } from './main/header/Header'
import { ProfileNavbar } from './profile/ProfileNavbar'

type ComponentLayoutProps = {
  layout?: 'blank' | 'simple' | 'auth' | 'profile'
}

export const ComponentLayout = ({ layout = 'blank' }: ComponentLayoutProps) => {
  return (
    <>
      {layout === 'auth' && (
        <>
          <AuthHeader />
          <div className="min-h-[calc(100vh-3.5rem)] flex justify-center items-center">
            <main className="w-full m-2 max-w-md">
              <Outlet />
            </main>
          </div>
        </>
      )}

      {layout === 'simple' && (
        <div className="flex flex-col">
          <Header />
          <Cart />
          <main className="h-full w-full container pb-10">
            <Outlet />
          </main>
        </div>
      )}

      {layout === 'profile' && (
        <div className="flex flex-col">
          <Header />
          <Cart />
          <main className="grid grid-cols-[auto,1fr]">
            <ProfileNavbar />
            <section className="p-7">
              <Outlet />
            </section>
          </main>
        </div>
      )}

      {layout === 'blank' && <Outlet />}
    </>
  )
}
