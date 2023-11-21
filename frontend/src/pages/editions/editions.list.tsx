import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { EditionToolbar } from './editions.toolbar'
import { EditionColumns, columns } from './table/editions.columns'

export const EditionsListPage = () => {
  const { title, breadcrumb } = usePageUtils('editions')

  const { list } = useFetch<EditionColumns[]>({
    baseUrl: backend.editions.baseUrl,
    query: ['editions'],
    fetch: {
      list: true
    }
  })

  return (
    <PageLayout
      title={title()}
      breadcrumb={breadcrumb()}
      isLoading={list.isLoading}
    >
      <DataTable
        columns={columns}
        data={list?.data ?? []}
        toolbar={<EditionToolbar />}
      />
    </PageLayout>
  )
}
