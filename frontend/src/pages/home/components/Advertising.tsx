import { Button, Image } from '@nextui-org/react'

export const Advertising = () => {
  return (
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
  )
}
