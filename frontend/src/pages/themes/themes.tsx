import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend, routes } from '@/routes/routes'
import { ThemesForm } from './themes.form'
import { ThemesFormWithId } from './themes.schema'

export const ThemesPage = () => {
  const { id, t, title, breadcrumb } = usePageUtils('themes')

  const { get } = useFetch<ThemesFormWithId>({
    baseUrl: backend.themes.baseUrl,
    query: ['themes'],
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
        segments: [{ label: t('page.title'), link: routes.themes.index }]
      })}
    >
      <ThemesForm data={get.data} />
    </PageLayout>
  )
}
