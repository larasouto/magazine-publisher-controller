import { Breadcrumb } from '@/components/Breadcrumb'
import { Helmet } from 'react-helmet-async'
import { description } from './meta'

export type PageLayoutProps = {
  title: string
  children?: React.ReactNode
  breadcrumb?: Array<{ label: string; link?: string }>
  imageSrc?: string
}

export const PageLayout = ({
  title,
  breadcrumb,
  imageSrc,
  children
}: PageLayoutProps) => {
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
          className="mb-5"
        />
      )}
      <article>{children}</article>
    </>
  )
}
