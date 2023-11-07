import { Loading } from '@/components/Loading'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { cn } from '@nextui-org/react'
import { Helmet } from 'react-helmet-async'
import { description } from './meta'

export type PageLayoutProps = {
  title: string
  children?: React.ReactNode
  breadcrumb?: Array<{ label: string; link?: string }>
  imageSrc?: string
  isLoading?: boolean
  classNames?: {
    breadcrumb?: string
  }
}

export const PageLayout = ({
  title,
  breadcrumb,
  imageSrc,
  children,
  isLoading = false,
  classNames
}: PageLayoutProps) => {
  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <Helmet>
        <title>Revista {title && `| ${title}`}</title>
        <meta name="description" content={description} />
      </Helmet>
      {breadcrumb && (
        <Breadcrumb
          title={title}
          items={breadcrumb}
          imageSrc={imageSrc ?? false}
          className={cn('mb-5', classNames?.breadcrumb)}
        />
      )}
      <main>{children}</main>
    </>
  )
}
