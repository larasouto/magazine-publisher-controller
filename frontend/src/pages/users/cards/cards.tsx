import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend, routes } from '@/routes/routes'
import { CardsForm } from './cards.form'
import { CardDataWithId } from './cards.schema'

export const CardsPage = () => {
  const { id, breadcrumb } = usePageUtils('cards')

  const { get } = useFetch<CardDataWithId>({
    baseUrl: backend.profile.cards.baseUrl,
    query: ['cards'],
    fetch: {
      id,
      get: true
    }
  })

  return (
    <PageLayout
      title={id ? 'Editar Cartão' : 'Novo Cartão'}
      classNames={{ breadcrumb: 'mt-0' }}
      isLoading={get.isLoading}
      breadcrumb={breadcrumb({
        home: { label: 'Perfil' },
        segments: [{ label: 'Cartões', link: routes.profile.cards.index }]
      })}
    >
      <CardsForm data={get.data} />
    </PageLayout>
  )
}
