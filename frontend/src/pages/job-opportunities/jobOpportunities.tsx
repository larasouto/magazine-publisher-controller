import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend, routes } from '@/routes/routes'


export const JobOpportunitiesPage = () => {
  const { id, t, title, breadcrumb } = usePageUtils('jobOpportunities')

  const { get } = useFetch<JobOpportunityFormWithId>({
    baseUrl: backend.jobOpportunities.baseUrl,
    query: ['jobOpportunities'],
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
        segments: [{ label: t('page.title'), link: routes.jobOpportunities.index }]
      })}
    >
      <JobOpportunitiesForm data={get.data} />
    </PageLayout>
  )
}
