import { Loading } from '@/components/Loading'
import { useReporter } from '@/hooks/useReporter'
import { PageLayout } from '@/layout/PageLayout'
import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { ReportersForm } from './reporters.form'

export const ReportersPage = () => {
  const { t } = useTranslation('reporters')
  const { id, getData } = useReporter()
  const navigate = useNavigate()

  const title = id ? t('page.edit') : t('page.new')
  const breadcrumb = [
    { label: t('page.title'), link: routes.reporters.index },
    { label: title }
  ]

  const { data, isLoading, isError } = useQuery(['reporter', 'id'], getData, {
    enabled: !!id
  })

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    navigate(routes.categories.index)
  }

  return (
    <PageLayout
      title={title}
      breadcrumb={breadcrumb}
      imageSrc="/banner-categories.jpg"
    >
      <ReportersForm data={data} />
    </PageLayout>
  )
}
