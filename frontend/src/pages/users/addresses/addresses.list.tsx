import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { AddressesToolbar } from './addresses.toolbar'
import { AddressesColumns, columns } from './table/addresses.columns'

export const AddressesListPage = () => {
  const { title, breadcrumb } = usePageUtils('addresses')

  const { list } = useFetch<AddressesColumns[]>({
    baseUrl: backend.profile.addresses.baseUrl,
    query: ['addresses'],
    fetch: {
      list: true
    }
  })

  return (
    <PageLayout
      title={title()}
      isLoading={list.isLoading}
      breadcrumb={breadcrumb()}
      classNames={{ breadcrumb: 'mt-0' }}
    >
      <DataTable
        columns={columns}
        data={list?.data ?? []}
        toolbar={<AddressesToolbar />}
      />
    </PageLayout>
  )
}
