import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend, routes } from '@/routes/routes'
import { CardsToolbar } from './cards.toolbar'
import { CardsColumns, columns } from './table/cards.columns'

export const CardsListPage = () => {
  const { breadcrumb } = usePageUtils()

  const { list } = useFetch<CardsColumns[]>({
    baseUrl: backend.profile.cards.baseUrl,
    query: ['cards'],
    fetch: {
      list: true
    }
  })

  return (
    <PageLayout
      title={'Cartões'}
      isLoading={list.isLoading}
      breadcrumb={breadcrumb({
        home: { label: 'Perfil' },
        segments: [{ label: 'Cartões', link: routes.profile.cards.index }]
      })}
      classNames={{ breadcrumb: 'mt-0' }}
    >
      <DataTable
        columns={columns}
        data={list?.data ?? []}
        toolbar={<CardsToolbar />}
      />
    </PageLayout>
  )
}
