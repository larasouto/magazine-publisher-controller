import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { CardsToolbar } from './cards.toolbar'
import { CardsColumns, columns } from './table/cards.columns'

export const CardsListPage = () => {
  const { title, breadcrumb } = usePageUtils('Cards')

  const { list } = useFetch<CardsColumns[]>({
    baseUrl: backend.profile.cards.baseUrl,
    query: ['Cards'],
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
        toolbarButtons={<CardsToolbar />}
      />
    </PageLayout>
  )
}
