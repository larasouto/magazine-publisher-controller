import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image
} from '@nextui-org/react'
import { ChevronDown } from 'lucide-react'

export const JustForTestsDoNotUseIt = () => {
  return (
    <>
      <div className="h-80 bg-[#8782ad] dark:bg-[#18181c] space-y-8 rounded-b-xl">
        <section className="flex items-center justify-between h-full pl-16">
          <div className="relative flex flex-col gap-3">
            <h1 className="text-inherit text-3xl max-w-xl">
              Garanta <span>descontos de até</span>{' '}
              <span className="bg-violet-600 rounded-full px-4 font-semibold">
                50% OFF
              </span>{' '}
              em uma seleção escolhida de revistas.
            </h1>
            <span className="font-extralight text-violet-300 text-medium">
              Oferta por tempo limitado.
            </span>
            <Button
              size="lg"
              className="text-xl bg-gradient-to-tr from-indigo-700 to-violet-600 text-white shadow-lg w-fit"
            >
              Buy now
            </Button>
          </div>
          <Image className="min-w-fit h-96" src="/mockup-2.png" />
        </section>
        <section className="flex gap-2 justify-between">
          <div className="flex gap-2">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button
                  className="rounded-full h-7"
                  endContent={<ChevronDown className="w-5 h-5" />}
                >
                  Revista
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>hi</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button
                  className="rounded-full h-7"
                  endContent={<ChevronDown className="w-5 h-5" />}
                >
                  Preço
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>hi</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button
                  className="rounded-full h-7"
                  endContent={<ChevronDown className="w-5 h-5" />}
                >
                  Revisões
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>hi</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button
                  className="rounded-full h-7"
                  endContent={<ChevronDown className="w-5 h-5" />}
                >
                  Materiais
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>hi</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button
                className="rounded-full h-7"
                variant="bordered"
                endContent={<ChevronDown className="w-5 h-5" />}
              >
                Todos os filtros
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem>hi</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </section>
        <section>
          <h1 className="text-3xl font-bold mb-7 mt-2">Magazines for you</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
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
      </div>
    </>
  )
}

export default JustForTestsDoNotUseIt
