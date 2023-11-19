import { Loading } from '@/components/Loading'
import { Format } from '@/components/ui/label/Format'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { useSupabase } from '@/hooks/useSupabase'
import { PageLayout } from '@/layout/PageLayout'
import { AdvertisingColumns } from '@/pages/advertisings/user/table/advertisings.columns'
import { backend } from '@/routes/routes'
import { Divider, Image } from '@nextui-org/react'

export const AdvertisingsDetails = () => {
  const { id, title, breadcrumb } = usePageUtils('advertisings')
  const { getImage } = useSupabase()

  const { get } = useFetch<AdvertisingColumns>({
    baseUrl: backend.advertisings.baseUrl,
    query: ['advertisings', 'payment'],
    fetch: {
      id,
      get: true
    }
  })

  if (get.isLoading) {
    return <Loading />
  }

  return (
    <PageLayout title={title()} breadcrumb={breadcrumb()}>
      <section className="flex flex-col gap-2">
        <div className="flex gap-32">
          <div className="flex items-center justify-center bg-default-100 rounded-xl w-96 h-96">
            <Image
              src={getImage({ path: get.data?.imagePath ?? '' })}
              classNames={{
                wrapper: 'w-64',
                img: 'w-full object-cover'
              }}
            />
          </div>
          <div className="flex flex-col gap-2 flex-grow">
            <h1 className="text-4xl">{get.data?.title}</h1>
            <p>{get.data?.description}</p>
            <Divider />
            <p>{<Format text={String(get.data?.price)} type="price" />}</p>
            <Divider />
            <div className="flex gap-2"></div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
