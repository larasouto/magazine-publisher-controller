import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { PhotographersToolbar } from './photographers.toolbar'
import { PhotographerColumns, columns } from './table/photographers.columns'

export const PhotographersListPage = () => {
  const { title, breadcrumb } = usePageUtils('photographers')

  const { list } = useFetch<PhotographerColumns[]>({
    baseUrl: backend.photographers.baseUrl,
    query: ['photographers'],
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
        toolbar={<PhotographersToolbar />}
      />
    </PageLayout>
  )
}
