import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { routes } from '@/routes/routes'
import { CategoriesForm } from './categories.form'
import { CategoryFormWithId } from './categories.schema'

export const CategoriesPage = () => {
  const { id, t, title, breadcrumb } = usePageUtils('categories')

  const { get } = useFetch<CategoryFormWithId>({
    baseUrl: routes.categories.index,
    query: ['categories'],
    fetch: {
      id: id,
      get: true
    }
  })

  return (
    <PageLayout
      title={title({ dynamic: true })}
      imageSrc="/banner.jpg"
      isLoading={get.isLoading}
      breadcrumb={breadcrumb({
        segments: [{ label: t('page.title'), link: routes.categories.index }]
      })}
    >
      <CategoriesForm data={get.data} />
    </PageLayout>
  )
}
