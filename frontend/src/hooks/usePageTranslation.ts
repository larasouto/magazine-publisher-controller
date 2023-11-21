import { BreadcrumbItem } from '@/components/ui/Breadcrumb'
import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

type PageProps = {
  _default?: boolean
  segments?: BreadcrumbItem[]
  dynamic?: boolean
  title?: string
  home?: BreadcrumbItem | false
}

export const usePageUtils = (ns?: string | string[]) => {
  const { id } = useParams()
  const { t } = useTranslation(ns)

  const title = ({ dynamic = false, title }: PageProps = {}) => {
    if (dynamic) {
      return id ? t('page.edit') : t('page.new')
    }

    return title ?? t('page.title')
  }

  const breadcrumb = ({
    _default = true,
    home = { label: 'Home', link: routes.home.index },
    segments
  }: PageProps = {}) => {
    const useHome = home ? [home] : []

    const content =
      _default && !segments ? [...useHome, { label: title() }] : [...useHome]

    return !segments ? content : [...content, ...segments]
  }

  return { id, t, title, breadcrumb }
}
