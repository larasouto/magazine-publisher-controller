import { useFetch } from '@/hooks/useFetch'
import { Divider } from '@nextui-org/react'
import { Rating } from '@smastrom/react-rating'

type ReviewsProps = {
  id: string
  rating: number
  review: string
  title: string
  createdAt: string
  reviewerId: string
}

export const Evaluations = ({ editionId }: { editionId?: string }) => {
  const { list } = useFetch<ReviewsProps[]>({
    baseUrl: `/reviews?editionId=${editionId}`,
    query: ['reviews', editionId ?? ''],
    fetch: {
      list: true
    }
  })

  const averageEvaluation =
    list.data?.reduce((acc, evaluation) => acc + evaluation.rating, 0) ?? 0
  const totalEvaluation = list.data?.length ?? 0

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="mt-5 text-2xl font-bold">Avaliações</h1>
        <div className="flex gap-2">
          <h3>Média das Avaliações</h3>
          <Rating
            className="w-28"
            value={averageEvaluation / totalEvaluation}
            readOnly
          />
        </div>
      </div>
      <Divider className="mb-2" />
      {list.data?.length === 0 && (
        <div className="flex flex-col items-center justify-center border px-3 py-10 border-dashed rounded-lg border-foreground-300 gap-1">
          <h1 className="text-2xl font-bold text-foreground-500">
            {`${'Nenhuma avaliação no momento'}`}
          </h1>
          <p className="text-default-500 text-center">
            {`Adquira o produto e seja o primeiro a avaliar!`}
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {list.data?.map((evaluation) => (
          <div
            key={evaluation.id}
            className="flex flex-col bg-default-50 rounded-lg p-5 gap-2"
          >
            <div className="flex flex-col gap-2">
              <span className="font-bold">{evaluation.reviewerId}</span>
              <span className="flex gap-5">
                <div className="flex flex-col gap-0.5">
                  <span className="text-small text-foreground-500">Título</span>
                  <span className="font-bold">{evaluation.title}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-small text-foreground-500">
                    Avaliado em
                  </span>
                  <span
                    title={`${evaluation.rating} estrela${
                      evaluation.rating > 1 ? 's' : ''
                    }`}
                  >
                    <Rating
                      className="w-28"
                      value={evaluation.rating}
                      readOnly
                    />
                  </span>
                </div>
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-small text-foreground-500">Comentário</span>
              <span
                className="line-clamp-2 break-words"
                lang={'pt-BR'}
                title={evaluation.review}
              >
                {evaluation.review}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
