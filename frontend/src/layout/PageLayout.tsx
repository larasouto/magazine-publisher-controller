import { LocaleSwitcher } from '@/components/features/LocaleSwitcher'
import { ThemeSwitcher } from '@/components/features/ThemeSwitcher'
import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'
import { Helmet } from 'react-helmet-async'
import { description } from './meta'

export type PageLayoutProps = ComponentProps<'div'> & {
  title: string
  children?: React.ReactNode
  isAuth?: boolean
}

export const PageLayout = ({
  title,
  children,
  isAuth,
  ...props
}: PageLayoutProps) => {
  return (
    <>
      <Helmet>
        <title>Revista {title && `| ${title}`}</title>
        <meta name="description" content={description} />
      </Helmet>
      <div className={cn('relative min-h-screen', props.className)}>
        {isAuth && (
          <div className="absolute top-5 right-5">
            <div className="flex gap-2">
              <LocaleSwitcher />
              <ThemeSwitcher />
            </div>
          </div>
        )}
        <section>{children}</section>
      </div>
    </>
  )
}
