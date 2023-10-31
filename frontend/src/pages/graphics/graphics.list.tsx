import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { GraphicsColumns, columns } from './table/graphics.columns'
import { GraphicsToolbar } from './graphics.toolbar'

export const GraphicsListPage = () => {
  const { t } = useTranslation('graphics')
  const title = t('page.title')

  const { list } = useFetch<GraphicsColumns[]>({
    baseUrl: backend.graphics.baseUrl,
    query: ['graphics'],
    fetch: {
      list: true
    }
  })

  return (
    <PageLayout
      title={title}
      isLoading={list.isLoading}
      breadcrumb={[{ label: title }]}
    >
      <DataTable
        columns={columns}
        data={list?.data ?? []}
        toolbarButtons={<GraphicsToolbar />}
      />
    </PageLayout>
  )
}
