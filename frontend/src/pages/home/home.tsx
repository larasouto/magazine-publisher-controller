import { Advertising } from './components/Advertising'
import { Filters } from './components/Filters'
import { Products } from './components/Products'

export const HomePage = () => {
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-8">
          <div className="h-full bg-[#7b75aa] dark:bg-[#18181c] rounded-b-3xl">
            <Advertising />
          </div>
        </div>
        <main className="pb-16 flex flex-col gap-3">
          <Filters className="px-12" />
          <Products />
        </main>
      </div>
    </>
  )
}

export default HomePage
