import { Image } from '@nextui-org/react'

export const Products = () => {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-7 mt-2">Magazines for you</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3">
        <div className="bg-default group">
          <Image src="/magazine-1.png" className="w-full" />
          <div className="flex flex-col gap-2 p-3">
            <h1 className="text-lg">Into the Wild Brazil</h1>
            <p>Alguma descrição super interessante aqui.</p>
          </div>
        </div>
        <div className="bg-default h-72 rounded-2xl" />
        <div className="bg-default h-72 rounded-2xl" />
        <div className="bg-default h-72 rounded-2xl" />
        <div className="bg-default h-72 rounded-2xl" />
        <div className="bg-default h-72 rounded-2xl" />
        <div className="bg-default h-72 rounded-2xl" />
      </div>
    </section>
  )
}
