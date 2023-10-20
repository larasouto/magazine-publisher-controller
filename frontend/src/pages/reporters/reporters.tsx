import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend, routes } from '@/routes/routes'
import { ReportersForm } from './reporters.form'
import { ReporterFormWithId } from './reporters.schema'

export const ReportersPage = () => {
  const { id, t, title, breadcrumb } = usePageUtils('reporters')

  const { get } = useFetch<ReporterFormWithId>({
    baseUrl: backend.reporters.baseUrl,
    query: ['reporters'],
    fetch: {
      id,
      get: true
    }
  })

  return (
    <PageLayout
      title={title({ dynamic: true })}
      imageSrc="/banner.jpg"
      isLoading={get.isLoading}
      breadcrumb={breadcrumb({
        segments: [{ label: t('page.title'), link: routes.reporters.index }]
      })}
    >
      <ReportersForm data={get.data} />
    </PageLayout>
  )
}
