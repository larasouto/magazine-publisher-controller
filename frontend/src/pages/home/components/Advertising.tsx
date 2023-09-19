import { Button, Image } from '@nextui-org/react'

export const Advertising = () => {
  return (
    <section className="flex items-center justify-between h-full pl-16">
      <div className="relative flex flex-col gap-3">
        <h1 className="text-inherit text-3xl max-w-xl">
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
      <Image className="h-48 sm:h-72" src="/mockup-2.png" />
    </section>
  )
}
