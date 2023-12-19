import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { CouponsToolbar } from './coupons.toolbar'
import { CouponsColumns, columns } from './table/coupons.columns'

export const CouponsListPage = () => {
  const { breadcrumb } = usePageUtils('coupons')

  const { list, removeMany } = useFetch<CouponsColumns[]>({
    baseUrl: backend.coupons.baseUrl,
    query: ['coupons'],
    fetch: {
      list: true
    }
  })

  return (
    <PageLayout
      title={'Cupons'}
      isLoading={list.isLoading}
      breadcrumb={breadcrumb()}
    >
      <DataTable
        columns={columns}
        data={list?.data ?? []}
        toolbar={<CouponsToolbar />}
        asyncFn={removeMany.mutateAsync}
      />
    </PageLayout>
  )
}
