import { Format } from '@/components/ui/label/Format'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { Button, Image } from '@nextui-org/react'

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
        <div className="flex flex-col gap-3">
          <div className="bg-default-50 rounded-lg p-5">
            <div className="flex gap-3">
              <Image src="/revista1.jpg" width={100} height={100} />
              <div className="flex flex-col gap-1.5 max-w-lg">
                <div className="flex flex-col">
                  <label className="tracking-wide text-tiny text-default-500">
                    Título
                  </label>
                  <h1 className="font-bold line-clamp-1">Revista 1</h1>
                </div>
                <div className="flex flex-col">
                  <label className="tracking-wide text-tiny text-default-500">
                    Descrição
                  </label>
                  <p className="line-clamp-2">Revista 2</p>
                </div>
                <div className="flex flex-col">
                  <label className="tracking-wide text-tiny text-default-500">
                    Valor pago
                  </label>
                  <p className="line-clamp-1">
                    <Format text={'49.90'} size="sm" type="price" />
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <Button color="primary">Comprar novamente</Button>
              <Button>Comentar</Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
