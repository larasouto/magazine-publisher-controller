import { DataTable } from '@/components/ui/table/DataTable'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { CandidateColumns, columns } from './table/candidates.columns'
import { CandidateToolbar } from './candidates.toolbar'

export const CandidateListPage = () => {
  const { breadcrumb } = usePageUtils('candidates')

  const { list, removeMany } = useFetch<CandidateColumns[]>({
    baseUrl: backend.candidates.baseUrl,
    query: ['candidates'],
    fetch: {
      list: true
    }
  })

  return (
    <PageLayout
      title={'Vaga de emprego'}
      isLoading={list.isLoading}
      breadcrumb={breadcrumb({
        segments: [{ label: 'Vaga de emprego' }]
      })}
    >
      <DataTable
        columns={columns}
        data={list?.data ?? []}
        toolbarButtons={<CandidateToolbar />}
        fn={removeMany.mutateAsync}
      />
    </PageLayout>
  )
}
