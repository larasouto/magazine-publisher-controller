import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { GraphicsOrdersReturnsToolbar } from './graphicsOrderReturn.toolbar'
import {
  GraphicsOrdersReturnColumns,
  columns
} from './table/graphicsOrderReturn.columns'

export const GraphicsOrdersReturnListPage = () => {
  const { title, breadcrumb } = usePageUtils('graphicsOrderReturn')

  const { list } = useFetch<GraphicsOrdersReturnColumns[]>({
    baseUrl: backend.graphicsOrderReturn.baseUrl,
    query: ['graphicsOrderReturn'],
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
        toolbar={<GraphicsOrdersReturnsToolbar />}
      />
    </PageLayout>
  )
}
