import { Divider } from '@nextui-org/react'
import { Rating } from '@smastrom/react-rating'

const evaluations = [
  {
    id: 1,
    name: 'João da Silva',
    title: 'Excelente',
    evaluation: 5,
    comment: 'Muito bom'
  },
  {
    id: 2,
    name: 'Maria da Silva',
    title: 'Bom',
    evaluation: 4,
    comment: 'Achei bom'
  },
  {
    id: 3,
    name: 'José da Silva',
    title: 'Ruim',
    evaluation: 1,
    comment: 'Ruim'
  },
  {
    id: 4,
    name: 'Carlos Rogério',
    title: 'Ruim',
    evaluation: 1,
    comment: 'Péssimo, não percam tempo comprando!'
  },
  {
    id: 5,
    name: 'Ana Paola',
    title: 'Interessante!',
    evaluation: 5,
    comment: 'Super interessante, recomendo!'
  }
]

export const Evaluations = () => {
  const averageEvaluation = evaluations.reduce(
    (acc, evaluation) => acc + evaluation.evaluation,
    0
  )

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="mt-5 text-2xl font-bold">Avaliações</h1>
        <div className="flex gap-2">
          <h3>Média das Avaliações</h3>
          <Rating
            className="w-28"
            value={averageEvaluation / evaluations.length}
            readOnly
          />
        </div>
      </div>
      <Divider className="mb-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {evaluations.map((evaluation) => (
          <div
            key={evaluation.id}
            className="flex flex-col bg-default-50 rounded-lg p-5 gap-2"
          >
            <div className="flex flex-col gap-2">
              <span className="font-bold">{evaluation.name}</span>
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
                    title={`${evaluation.evaluation} estrela${
                      evaluation.evaluation > 1 ? 's' : ''
                    }`}
                  >
                    <Rating
                      className="w-28"
                      value={evaluation.evaluation}
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
                title={evaluation.comment}
              >
                {evaluation.comment}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
