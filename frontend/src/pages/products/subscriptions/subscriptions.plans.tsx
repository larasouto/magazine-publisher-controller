import { Format } from '@/components/ui/label/Format'
import { useFetch } from '@/hooks/useFetch'
import { SubscriptionColumns } from '@/pages/subscriptions/table/subscriptions.columns'
import { backend, routes } from '@/routes/routes'
import { replaceParams } from '@/utils/replace-params'
import { Button, Chip, Link, cn } from '@nextui-org/react'
import { WalletCards } from 'lucide-react'

export const SubscriptionsPlan = () => {
  const { list } = useFetch<SubscriptionColumns[]>({
    baseUrl: backend.subscriptions.baseUrl,
    query: ['subscriptions'],
    fetch: {
      list: true
    }
  })

  console.log(list.data)

  return (
    <div className="lg:px-36">
      <h1 className="text-3xl text-extrabold pt-5 pb-2 px-7">
        Assinaturas Disponíveis
      </h1>
      <div className="h-full flex gap-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7 w-full p-5">
          {list.data?.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between gap-6 rounded-3xl bg-default-50 p-5"
            >
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h1
                    className={cn('text-xl font-extrabold', {
                      'text-blue-500': item.type === 0,
                      'text-green-600': item.type === 1,
                      'text-yellow-600': item.type === 2
                    })}
                  >
                    {item.name}
                  </h1>
                  <Chip size="md" variant="bordered">
                    <Format
                      text={String(item.price)}
                      type="price"
                      className="pb-0 text-small"
                    />
                  </Chip>
                </div>
                <p>{item.description}</p>
              </div>
              <Link
                href={replaceParams(routes.subscriptions.payment, [item.id])}
                color="foreground"
              >
                <Button fullWidth color="primary" className="flexitems-center">
                  <WalletCards className="w-5 h-5" />
                  <span className="flex items-center gap-2">
                    <span>Assinar </span>
                  </span>
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
