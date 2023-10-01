import { Loading } from '@/components/Loading'
import { DataTable } from '@/components/table/DataTable'
import { useReporter } from '@/hooks/useReporter'
import { PageLayout } from '@/layout/PageLayout'
import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { ReportersToolbar } from './reporter.toolbar'
import { ReporterColumns, columns } from './table/reporters.columns'

export const ReporterListPage = () => {
  const { t } = useTranslation('reporters')
  const title = t('page.title')
  const breadcrumb = [{ label: title }]
  const navigate = useNavigate()
  const { list } = useReporter()

  const { data, isLoading, isError } = useQuery<{ dto: ReporterColumns[] }>(
    ['reporters'],
    list
  )

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    navigate(routes.reporters.index)
  }

  return (
    <PageLayout title={title} breadcrumb={breadcrumb}>
      <DataTable
        columns={columns}
        data={data?.dto ?? []}
        toolbarButtons={<ReportersToolbar />}
      />
    </PageLayout>
  )
}
