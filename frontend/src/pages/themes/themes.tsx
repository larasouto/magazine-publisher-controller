import { Loading } from '@/components/Loading'
import { useTheme } from '@/hooks/useTheme'
import { PageLayout } from '@/layout/PageLayout'
import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { ThemesForm } from './themes.form'
import { ThemesFormWithId } from './themes.schema'

export const ThemesPage = () => {
  const { t } = useTranslation('themes')
  const { id, getData } = useTheme()
  const navigate = useNavigate()

  const title = id ? t('page.edit') : t('page.new')
  const breadcrumb = [
    { label: t('page.title'), link: routes.themes.index },
    { label: title }
  ]

  const { data, isLoading, isError } = useQuery<ThemesFormWithId>(
    ['theme', 'id'],
    getData,
    { enabled: !!id }
  )

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    navigate(routes.themes.index)
  }

  return (
    <PageLayout
      title={title}
      breadcrumb={breadcrumb}
      imageSrc="/banner-categories.jpg"
    >
      <ThemesForm data={data} />
    </PageLayout>
  )
}
