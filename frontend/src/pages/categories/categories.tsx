import { Loading } from '@/components/Loading'
import { useCategory } from '@/hooks/useCategory'
import { PageLayout } from '@/layout/PageLayout'
import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { CategoriesForm } from './categories.form'
import { CategoryFormWithId } from './categories.schema'

export const CategoriesPage = () => {
  const { t } = useTranslation('categories')
  const { id, getData } = useCategory()
  const navigate = useNavigate()

  const title = id ? t('page.edit') : t('page.new')
  const breadcrumb = [
    { label: t('page.title'), link: routes.categories.index },
    { label: title }
  ]

  const { data, isLoading, isError } = useQuery<CategoryFormWithId>(
    ['category', 'id'],
    getData,
    { enabled: !!id }
  )

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    navigate(routes.categories.index)
  }

  return (
    <PageLayout
      title={title}
      breadcrumb={breadcrumb}
      imageSrc="/banner-categories.jpg"
    >
      <CategoriesForm data={data} />
    </PageLayout>
  )
}
