import { routes } from '@/routes/routes'
import { Button, Image } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'

export const Advertising = () => {
  const navigate = useNavigate()

  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 items-center justify-between p-10 lg:py-0">
        <Image
          className="hidden sm:inline-flex"
          src="/mockup-2.png"
          removeWrapper
        />
        <div className="relative flex flex-col gap-3">
          <h1 className="text-inherit text-xl max-w-md lg:text-3xl lg:max-w-xl">
            Garanta <span>descontos de até</span>{' '}
            <span className="text-gray-200 bg-violet-600 rounded-full px-4 font-semibold">
              50% OFF
            </span>{' '}
            em uma seleção escolhida de revistas.
          </h1>
          <span className="font-light dark:font-extralight dark:text-violet-300 text-medium">
            Oferta por tempo limitado.
          </span>
          <Button
            size="lg"
            className="text-xl bg-gradient-to-tr from-indigo-700 to-violet-600 text-white shadow-lg w-fit"
          >
            Comprar agora
          </Button>
        </div>
      </section>
      <section className="flex items-center justify-between px-10 py-2 bg-[#7b75aa] dark:bg-[#3a0778]/40 rounded-b-xl lg:py-0 gap-2">
        <Image
          className="hidden sm:inline-flex py-2 w-48"
          src="/ad.jpg"
          removeWrapper
        />
        <div className="relative flex items-center gap-3">
          <div className="flex flex-col">
            <h1 className="text-inherit text-md max-w-md lg:text-2xl lg:max-w-xl">
              Procurando destacar sua empresa em nossas revistas?
            </h1>
            <span className="font-light dark:font-extralight dark:text-violet-300 text-medium">
              Solicite um anúncio em nossas páginas. Você quem escolhe a
              revista.
            </span>
          </div>
        </div>
        <Button
          size="md"
          className="text-xl bg-gradient-to-tr from-[#fee803] to-[#fee803] text-black shadow-lg w-fit"
          onClick={() => navigate(routes.advertisings.new)}
        >
          Solicite agora!
        </Button>
      </section>
    </>
  )
}
