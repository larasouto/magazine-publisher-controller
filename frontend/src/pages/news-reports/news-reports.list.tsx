import { Loading } from '@/components/Loading'
import { DataTable } from '@/components/table/DataTable'
import { usePhotographer } from '@/hooks/usePhotographers'
import { PageLayout } from '@/layout/PageLayout'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { NewsReportsToolbar } from './news-reports.toolbar'
import { NewsReportColumns, columns } from './table/news-reports.columns'

export const NewsReportsListPage = () => {
  const { t } = useTranslation('news-reports')
  const title = t('page.title')
  const breadcrumb = [{ label: title }]
  const { list } = usePhotographer()

  const { data, isLoading } = useQuery<{ dto: NewsReportColumns[] }>(
    ['news-reports'],
    list
  )

  if (isLoading) {
    return <Loading />
  }

  return (
    <PageLayout title={title} breadcrumb={breadcrumb}>
      <DataTable
        columns={columns}
        data={data?.dto ?? []}
        toolbarButtons={<NewsReportsToolbar />}
      />
    </PageLayout>
  )
}
