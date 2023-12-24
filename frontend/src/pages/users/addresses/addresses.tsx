import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend, routes } from '@/routes/routes'
import { AddressesForm } from './addresses.form'
import { AddressesDataWithId } from './addresses.schema'

export const AddressesPage = () => {
  const { id, t, title, breadcrumb } = usePageUtils('addresses')

  const { get } = useFetch<AddressesDataWithId>({
    baseUrl: backend.profile.addresses.baseUrl,
    query: ['addresses'],
    fetch: {
      id,
      get: true
    }
  })

  return (
    <PageLayout
      title={title({ dynamic: true })}
      classNames={{ breadcrumb: 'mt-0' }}
      isLoading={get.isLoading}
      breadcrumb={breadcrumb({
        home: { label: 'Perfil' },
        segments: [
          {
            label: t('page.title'),
            link: routes.profile.addresses.index
          }
        ]
      })}
    >
      <AddressesForm data={get.data} />
    </PageLayout>
  )
}
