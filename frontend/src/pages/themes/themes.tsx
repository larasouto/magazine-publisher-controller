import { useFetch } from '@/hooks/useFetch'
import { PageLayout } from '@/layout/PageLayout'
import { backend, routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { ThemesForm } from './themes.form'
import { ThemesFormWithId } from './themes.schema'

export const ThemesPage = () => {
  const { t } = useTranslation('themes')
  const { id } = useParams()
  const title = id ? t('page.edit') : t('page.new')

  const { get } = useFetch<ThemesFormWithId>({
    baseUrl: backend.themes.baseUrl,
    query: ['themes'],
    fetch: {
      id,
      get: true
    }
  })

  return (
    <PageLayout
      title={title}
      imageSrc="/banner.jpg"
      isLoading={get.isLoading}
      breadcrumb={[
        { label: t('page.title'), link: routes.themes.index },
        { label: title }
      ]}
    >
      <ThemesForm data={get.data} />
    </PageLayout>
  )
}
