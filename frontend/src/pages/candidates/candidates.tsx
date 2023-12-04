import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend, routes } from '@/routes/routes'
import { CandidateForm } from './candidates.form'
import { CandidateDataWithId } from './candidates.schema'

export const CandidatePage = () => {
  const { id, breadcrumb } = usePageUtils('candidates')

  const { get } = useFetch<CandidateDataWithId>({
    baseUrl: backend.candidates.baseUrl,
    query: ['candidates'],
    fetch: {
      id,
      get: true
    }
  })

  return (
    <PageLayout
      title={id ? 'Editar vaga de emprego' : 'Nova vaga de emprego'}
      imageSrc="/banner.jpg"
      isLoading={get.isLoading}
      breadcrumb={breadcrumb({
        segments: [{ label: 'Vaga de Emprego', link: routes.candidates.index }]
      })}
    >
      <CandidateForm data={get.data} />
    </PageLayout>
  )
}
