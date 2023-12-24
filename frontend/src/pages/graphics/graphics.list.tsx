import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { GraphicsToolbar } from './graphics.toolbar'
import { GraphicsColumns, columns } from './table/graphics.columns'

export const GraphicsListPage = () => {
  const { breadcrumb } = usePageUtils('graphics')

  const { list, removeMany } = useFetch<GraphicsColumns[]>({
    baseUrl: backend.graphics.baseUrl,
    query: ['graphics'],
    fetch: {
      list: true
    }
  })

  return (
    <PageLayout
      title={'Gráficas'}
      isLoading={list.isLoading}
      breadcrumb={breadcrumb({
        segments: [{ label: 'Gráficas', link: backend.graphics.baseUrl }]
      })
    }
    >
      <DataTable
        asyncFn={removeMany.mutateAsync}
        columns={columns}
        data={list?.data ?? []}
        toolbar={<GraphicsToolbar />}
      />
    </PageLayout>
  )
}
