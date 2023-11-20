import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { GraphicsOrdersToolbar } from './graphicsOrder.toolbar'
import { GraphicsOrdersColumns, columns } from './table/graphicsOrder.columns'

export const GraphicsOrdersListPage = () => {
  const { title, breadcrumb } = usePageUtils('graphicsOrders')

  const { list } = useFetch<GraphicsOrdersColumns[]>({
    baseUrl: backend.graphicsOrders.baseUrl,
    query: ['graphicsOrders'],
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
        toolbar={<GraphicsOrdersToolbar />}
      />
    </PageLayout>
  )
}
