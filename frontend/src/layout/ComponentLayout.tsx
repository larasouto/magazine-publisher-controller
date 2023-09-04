import { Outlet } from 'react-router-dom'
import { AuthHeader } from './auth/AuthHeader'

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
        <div className="grid grid-rows-[64px_1fr]">
          <div className="bg-red-600 h-full" />
          <main className="bg-blue-600 h-full">
            <Outlet />
          </main>
        </div>
      )}

      {layout === 'blank' && <Outlet />}
    </>
  )
}
