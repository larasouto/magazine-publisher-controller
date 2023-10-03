import { Loading } from '@/components/Loading'
import { useNewsReports } from '@/hooks/useNewsReports'
import { PageLayout } from '@/layout/PageLayout'
import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { NewsReportsForm } from './news-reports.form'

export const NewsReportsPage = () => {
  const { t } = useTranslation('news-reports')
  const { id, getData } = useNewsReports()

  const title = id ? t('page.edit') : t('page.new')
  const breadcrumb = [
    { label: t('page.title'), link: routes.news_reports.index },
    { label: title }
  ]

  const { data, isLoading } = useQuery(['news-report', 'id'], getData, {
    enabled: !!id
  })

  if (isLoading) {
    return <Loading />
  }

  return (
    <PageLayout
      title={title}
      breadcrumb={breadcrumb}
      imageSrc="/banner-categories.jpg"
    >
      <NewsReportsForm data={data} />
    </PageLayout>
  )
}
