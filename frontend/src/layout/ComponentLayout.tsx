import { Outlet } from 'react-router-dom'

type ComponentLayoutProps = {
  layout?: 'blank' | 'simple'
}

export const ComponentLayout = ({ layout = 'blank' }: ComponentLayoutProps) => {
  return (
    <>
      {layout === 'simple' && (
        <div className="w-full h-full">
          <div className="bg-red-600" />
          <div className="bg-blue-600">
            <Outlet />
          </div>
        </div>
      )}

      {layout === 'blank' && <Outlet />}
    </>
  )
}
