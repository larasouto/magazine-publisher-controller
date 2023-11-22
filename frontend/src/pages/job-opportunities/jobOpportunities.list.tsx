import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { JobOpportunitiesToolbar } from './jobOpportunities.toolbar'
import { JobOpportunityColumns, columns } from './table/jobOpportunities.columns'


export const JobOpportunitiesListPage = () => {
  const { title, breadcrumb } = usePageUtils('JobOpportunities')

  const { list } = useFetch<JobOpportunityColumns[]>({
    baseUrl: backend.jobOpportunities.baseUrl,
    query: ['JobOpportunities'],
    fetch: {
      list: true
    }
  })

  return (
    <PageLayout
      title={'Vagas de emprego'}
      isLoading={list.isLoading}
      breadcrumb={breadcrumb({
        segments: [{ label: 'Vagas de emprego'}]
      })}
    >
      <DataTable
        columns={columns}
        data={list?.data ?? []}
        toolbarButtons={<JobOpportunitiesToolbar />}
      />
    </PageLayout>
  )
}
