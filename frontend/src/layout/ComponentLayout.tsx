import { Outlet } from 'react-router-dom'

type ComponentLayoutProps = {
  layout?: 'blank' | 'simple'
}

export const ComponentLayout = ({ layout = 'blank' }: ComponentLayoutProps) => {
  return (
    <>
      {layout === 'simple' && (
        <>
          <Outlet />
        </>
      )}

      {layout === 'blank' && <Outlet />}
    </>
  )
}
