import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { DistributorToolbar } from './distributor.toolbar'
import { DistributorColumns, columns } from './table/distributor.columns'

export const DistributorListPage = () => {
  const { breadcrumb } = usePageUtils('distributor')

  const { list, removeMany } = useFetch<DistributorColumns[]>({
    baseUrl: backend.distributors.baseUrl,
    query: ['distributors'],
    fetch: {
      list: true
    }
  })

  return (
    <PageLayout
      title={'Distribuidoras'}
      isLoading={list.isLoading}
      breadcrumb={breadcrumb({
        segments: [{ label: 'Distribuidoras', link: backend.distributors.baseUrl }]
      })
    }
    >
      <DataTable
         asyncFn={removeMany.mutateAsync}
        columns={columns}
        data={list?.data ?? []}
        toolbar={<DistributorToolbar />}
      />
    </PageLayout>
  )
}
