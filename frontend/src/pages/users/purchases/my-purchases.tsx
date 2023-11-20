import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'

export const MyPurchasesPage = () => {
  const { breadcrumb } = usePageUtils()

  const { list } = useFetch({
    baseUrl: backend.orders.baseUrl,
    query: ['orders'],
    fetch: {
      list: true
    }
  })

  if (list.isLoading) {
    return <div>Carregando...</div>
  }

  return (
    <PageLayout
      title="Minhas Compras"
      breadcrumb={breadcrumb({
        home: { label: 'Perfil' },
        segments: [{ label: 'Minhas Compras' }]
      })}
    >
      <section className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <div className="bg-default-50 rounded-lg">
            <h1>Teste</h1>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
