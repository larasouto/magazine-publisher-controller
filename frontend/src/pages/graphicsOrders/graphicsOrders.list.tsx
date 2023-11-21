import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { GraphicsOrdersColumns, columns } from './table/graphicsOrders.columns'
import { GraphicsOrdersToolbar } from './graphicsOrders.toolbar'
import { ColumnDef } from '@tanstack/react-table'

export const GraphicsOrdersListPage = () => {
  const { title, breadcrumb } = usePageUtils('graphicsOrders')

  const { list } = useFetch<GraphicsOrdersColumns[]>({
    baseUrl: backend.graphicsOrders.baseUrl,
    query: ['graphicsOrders'],
    fetch: {
      list: true
    }
  })

  const adjustedColumns: ColumnDef<GraphicsOrdersColumns, number>[] = columns as ColumnDef<GraphicsOrdersColumns, number>[];

  return (
    <PageLayout
      title={title()}
      isLoading={list.isLoading}
      breadcrumb={breadcrumb()}
    >
      <DataTable
        columns={adjustedColumns}
        data={list?.data ?? []}
        toolbarButtons={<GraphicsOrdersToolbar />}
      />
    </PageLayout>
  )
}
