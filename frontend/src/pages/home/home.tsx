import { Advertising } from './components/Advertising'
import { Filters } from './components/Filters'
import { Products } from './components/Products'

export const HomePage = () => {
  return (
    <>
      <div className="h-80 bg-[#7b75aa] dark:bg-[#18181c] space-y-8 rounded-b-xl">
        <Advertising />
        <main className="px-16 pb-16 flex flex-col gap-3">
          <Filters />
          <Products />
        </main>
      </div>
    </>
  )
}

export default HomePage
