import { cn } from '@/lib/utils'
import { routes } from '@/routes/routes'
import { Image } from '@nextui-org/react'
import { ChevronRight } from 'lucide-react'
import { ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

type Item = {
  label: string
  link?: string
}

type BreadcrumbProps = ComponentProps<'div'> & {
  title: string
  items: Array<Item>
  imageSrc?: string | boolean
}

export const Breadcrumb = ({
  title,
  items,
  className,
  imageSrc,
  ...props
}: BreadcrumbProps) => {
  const { t } = useTranslation()
  const _items = [{ label: t('home'), link: routes.home.index }, ...items]

  return (
    <>
      {imageSrc && typeof imageSrc === 'string' && (
        <Image
          src={imageSrc}
          className="max-w-full min-w-full max-h-40 object-cover h-auto mt-2 mb-5"
          removeWrapper
        />
      )}
      <div
        className={cn('flex flex-col gap-1', className, {
          'mt-5': !imageSrc
        })}
        {...props}
      >
        <ol className="text-sm flex items-center overflow-y-auto">
          {_items.map((item, index) => {
            const isFirst = index === 0

            return (
              <div className="flex gap-2" key={item.label}>
                <li
                  key={item.label}
                  className="flex items-center text-xs font-bold uppercase tracking-wider min-w-max"
                >
                  {!isFirst && <ChevronRight size={20} />}

                  {item.link && (
                    <Link className="hover:underline" to={item.link}>
                      {item.label}
                    </Link>
                  )}

                  {!item.link && item.label}
                </li>
              </div>
            )
          })}
        </ol>
        <span className="text-2xl font-bold tracking-wide">{title}</span>
      </div>
    </>
  )
}
