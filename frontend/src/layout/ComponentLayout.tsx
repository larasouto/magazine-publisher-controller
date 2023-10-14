import { Cart } from '@/components/ui/cart/Cart'
import { Outlet } from 'react-router-dom'
import { AuthHeader } from './auth/AuthHeader'
import { Header } from './main/header/Header'

type ComponentLayoutProps = {
  layout?: 'blank' | 'simple' | 'auth'
}

export const ComponentLayout = ({ layout = 'blank' }: ComponentLayoutProps) => {
  return (
    <>
      {layout === 'auth' && (
        <>
          <AuthHeader />
          <div className="min-h-[calc(100vh-3.5rem)] flex justify-center items-center">
            <main className="w-full m-2 min-[420px]:w-[400px]">
              <Outlet />
            </main>
          </div>
        </>
      )}

      {layout === 'simple' && (
        <div className="flex flex-col">
          <Header />
          <Cart />
          <main className="h-full w-full container">
            <Outlet />
          </main>
        </div>
      )}

      {layout === 'blank' && <Outlet />}
    </>
  )
}
