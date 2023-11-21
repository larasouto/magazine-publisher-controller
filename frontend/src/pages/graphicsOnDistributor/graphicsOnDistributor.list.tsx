import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { GraphocsOnDistributorsToolbar } from './graphicsOnDistributor.toolbar'
import {
  GraphocsOnDistributorsColumns,
  columns
} from './table/graphicsOnDistributor.columns'

export const GraphocsOnDistributorsListPage = () => {
  const { title, breadcrumb } = usePageUtils('graphicsOnDistributor')

  const { list } = useFetch<GraphocsOnDistributorsColumns[]>({
    baseUrl: backend.graphicsOnDistributor.baseUrl,
    query: ['graphicsOnDistributor'],
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
        toolbar={<GraphocsOnDistributorsToolbar />}
      />
    </PageLayout>
  )
}
