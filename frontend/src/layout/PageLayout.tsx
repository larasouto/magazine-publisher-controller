import { Helmet } from 'react-helmet-async'
import { description } from './meta'
import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

export type PageLayoutProps = ComponentProps<'div'> & {
  title: string
  children?: React.ReactNode
}

export const PageLayout = ({ title, children, ...props }: PageLayoutProps) => {
  return (
    <>
      <Helmet>
        <title>Revista {title && `| ${title}`}</title>
        <meta name="description" content={description} />
      </Helmet>
      <div className={cn('min-h-screen', props.className)}>{children}</div>
    </>
  )
}
