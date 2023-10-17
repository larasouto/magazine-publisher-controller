import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { ReportersToolbar } from './reporter.toolbar'
import { ReporterColumns, columns } from './table/reporters.columns'

export const ReporterListPage = () => {
  const { title, breadcrumb } = usePageUtils('reporters')

  const { list } = useFetch<ReporterColumns[]>({
    baseUrl: backend.reporters.baseUrl,
    query: ['reporters'],
    fetch: {
      list: true
    }
  })

  return (
    <PageLayout
      title={title()}
      isLoading={list.isLoading}
      breadcrumb={breadcrumb()}
    >
      <DataTable
        columns={columns}
        data={list?.data ?? []}
        toolbarButtons={<ReportersToolbar />}
      />
    </PageLayout>
  )
}
