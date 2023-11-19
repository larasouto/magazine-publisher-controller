import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { GraphicsColumns, columns } from './table/graphics.columns'
import { GraphicsToolbar } from './graphics.toolbar'

export const GraphicsListPage = () => {
  const { title, breadcrumb } = usePageUtils('graphics')

  const { list } = useFetch<GraphicsColumns[]>({
    baseUrl: backend.graphics.baseUrl,
    query: ['graphics'],
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
        toolbarButtons={<GraphicsToolbar />}
      />
    </PageLayout>
  )
}
