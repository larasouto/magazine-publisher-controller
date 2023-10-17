import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { routes } from '@/routes/routes'
import { EditionsForm } from './editions.form'
import { EditionFormWithId } from './editions.schema'

export const EditionsPage = () => {
  const { id, t, title, breadcrumb } = usePageUtils('editions')

  const { get } = useFetch<EditionFormWithId>({
    baseUrl: routes.editions.index,
    query: ['editions'],
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
        segments: [{ label: t('page.title'), link: routes.editions.index }]
      })}
    >
      <EditionsForm data={get.data} />
    </PageLayout>
  )
}
