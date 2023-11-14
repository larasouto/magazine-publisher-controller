import { useDetails } from '@/contexts/user-details-provider'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { useSupabase } from '@/hooks/useSupabase'
import { PageLayout } from '@/layout/PageLayout'
import { EditionFormWithId } from '@/pages/editions/editions.schema'
import { backend } from '@/routes/routes'
import { Divider, Image } from '@nextui-org/react'
import { DetailsButtons } from './components/DetailsButtons'
import { DetailsEdition } from './components/DetailsEdition'
import { Evaluations } from './components/Evaluations'

export const EditionShow = () => {
  const { id, breadcrumb } = usePageUtils('editions')
  const { getImage } = useSupabase()
  const { user } = useDetails()

  const {
    get: { data, isLoading }
  } = useFetch<EditionFormWithId>({
    baseUrl: backend.editions.baseUrl,
    query: ['editions'],
    fetch: {
      id,
      get: true
    }
  })

  return (
    <PageLayout
      title={'Visualizar Edição'}
      breadcrumb={breadcrumb()}
      isLoading={isLoading}
    >
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <section className="flex flex-col gap-2">
        <div className="flex flex-col xs:flex-row gap-4 md:gap-6">
          <div className="flex items-center justify-center bg-default-50 rounded-xl p-0 md:py-7 w-1/3 h-full">
            <Image
              src={getImage({ path: data?.coverPath ?? '' })}
              classNames={{
                wrapper: 'w-72',
                img: 'w-full object-cover'
              }}
            />
          </div>
          <div className="flex flex-col w-2/3 gap-2">
            <DetailsEdition data={data} />
            <Divider />
            <DetailsButtons data={data} />
          </div>
        </div>
        <section>
          <Evaluations />
        </section>
      </section>
    </PageLayout>
  )
}
