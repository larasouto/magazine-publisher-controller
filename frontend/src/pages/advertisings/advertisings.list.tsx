import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { AdvertisingToolbar } from './advertisings.toolbar'
import { AdvertisingColumns, columns } from './table/advertisings.columns'

export const AdvertisingsListPage = () => {
  const { title, breadcrumb } = usePageUtils('advertisings')

  const { list, removeMany } = useFetch<AdvertisingColumns[]>({
    baseUrl: backend.advertisings.baseUrl,
    query: ['advertisings'],
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
        toolbarButtons={<AdvertisingToolbar />}
        fn={removeMany.mutateAsync}
      />
    </PageLayout>
  )
}
