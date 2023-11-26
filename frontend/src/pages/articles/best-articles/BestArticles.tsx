import { RichEditor } from '@/components/editor/RichEditor'
import { useFetch } from '@/hooks/useFetch'
import { usePageUtils } from '@/hooks/usePageTranslation'
import { PageLayout } from '@/layout/PageLayout'
import { backend } from '@/routes/routes'
import { Image } from '@nextui-org/react'
import { useEffect } from 'react'

type BestArticlesProps = {
  id: string
  text: string
  subtitle: string
  imagePath: string
  isTopSeller: boolean
  title: string
}

export const BestArticles = () => {
  const { breadcrumb } = usePageUtils()

  const { list } = useFetch<BestArticlesProps[]>({
    baseUrl: backend.articles.baseUrl,
    query: ['best-articles'],
    fetch: {
      list: true
    }
  })

  useEffect(() => {
    console.log(list.data)
  })

  const isTopSeller = list?.data?.filter((article) => article.isTopSeller)

  return (
    <PageLayout
      title={'Melhores Reportagens'}
      breadcrumb={breadcrumb({
        segments: [{ label: 'Melhores Reportagens' }]
      })}
      isLoading={list.isLoading}
    >
      <section className="flex flex-col gap-3">
        {isTopSeller?.map((article) => (
          <div
            key={article.id}
            className="bg-default-50 min-h-[320px] rounded-lg p-5"
          >
            <div className="flex gap-5 mb-5">
              <Image src={`/revista1.jpg`} width={120} />
              <Image src={`/revista2.jpg`} width={120} />
              <Image src={`/revista3.jpg`} width={120} />
            </div>
            <h1 className="text-2xl font-bold">{article.title}</h1>
            <h2 className="text-lg font-normal mb-5">{article.subtitle}</h2>
            <RichEditor content={article.text} value={article.text} noChars />
          </div>
        ))}
      </section>
    </PageLayout>
  )
}
