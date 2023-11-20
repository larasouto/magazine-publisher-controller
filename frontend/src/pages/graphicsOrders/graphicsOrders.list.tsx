import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { GraphicsOrdersColumns, columns } from './table/graphicsOrders.columns'
import { GraphicsOrdersToolbar } from './graphicsOrders.toolbar'


export const GraphicsOrdersListPage = () => {
  const { title, breadcrumb } = usePageUtils('graphicsOrders')

  const { list } = useFetch<GraphicsOrdersColumns[]>({
    baseUrl: backend.graphicsOrder.baseUrl,
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
        toolbarButtons={<GraphicsOrdersToolbar />}
      />
    </PageLayout>
  )
}
