import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'


export const JobOpportunitiesListPage = () => {
  const { title, breadcrumb } = usePageUtils('JobOpportunities')

  const { list } = useFetch<JobOpportunityColumns[]>({
    baseUrl: backend.JobOpportunities.baseUrl,
    query: ['JobOpportunities'],
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
        toolbarButtons={<JobOpportunitiesToolbar />}
      />
    </PageLayout>
  )
}
