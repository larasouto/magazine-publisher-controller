import { Helmet } from 'react-helmet-async'
import { description } from './meta'

export type PageLayoutProps = {
  title: string
  children?: React.ReactNode
}

export const PageLayout = ({ title, children }: PageLayoutProps) => {
  return (
    <>
      <Helmet>
        <title>Revista {title && `| ${title}`}</title>
        <meta name="description" content={description} />
      </Helmet>
      <article>{children}</article>
    </>
  )
}
