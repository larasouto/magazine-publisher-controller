import { cn } from '@/lib/utils'
import { Image } from '@nextui-org/react'
import { ChevronRight } from 'lucide-react'
import { ComponentProps } from 'react'
import { Link } from 'react-router-dom'

export type BreadcrumbItem = {
  label: string
  link?: string
}

type BreadcrumbProps = ComponentProps<'div'> & {
  title: string
  items: Array<BreadcrumbItem>
  imageSrc?: string | boolean
}

export const Breadcrumb = ({
  title,
  items = [],
  className,
  imageSrc,
  ...props
}: BreadcrumbProps) => {
  return (
    <>
      {imageSrc && typeof imageSrc === 'string' && (
        <Image
          src={imageSrc}
          classNames={{
            wrapper: 'max-w-full min-w-full mt-2 mb-5',
            img: 'max-h-40 object-cover max-w-full min-w-full'
          }}
          isZoomed
        />
      )}
      <div
        className={cn(
          'flex flex-col gap-1',
          {
            'mt-5': !imageSrc
          },
          className
        )}
        {...props}
      >
        <ol className="text-sm flex items-center overflow-y-auto">
          {items.map((item, index) => {
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
