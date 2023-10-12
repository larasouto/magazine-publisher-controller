import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { ReportersToolbar } from './reporter.toolbar'
import { ReporterColumns, columns } from './table/reporters.columns'

export const ReporterListPage = () => {
  const { t } = useTranslation('reporters')
  const title = t('page.title')

  const { list } = useFetch<ReporterColumns[]>({
    baseUrl: backend.reporters.baseUrl,
    query: ['reporters'],
    fetch: {
      list: true
    }
  })

  return (
    <PageLayout
      title={title}
      isLoading={list.isLoading}
      breadcrumb={[{ label: title }]}
    >
      <DataTable
        columns={columns}
        data={list?.data ?? []}
        toolbarButtons={<ReportersToolbar />}
      />
    </PageLayout>
  )
}
