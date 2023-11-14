import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'
import { FormatDate } from './FormatDate'
import { FormatPrice } from './FormatPrice'

type FormatProps = ComponentProps<'span'> & {
  text: string
  isRequired?: boolean
  type?: 'text' | 'price' | 'date'
  options?: {
    date?: Intl.DateTimeFormatOptions
    price?: Intl.NumberFormatOptions
  }
  size?: 'xs' | 'sm' | 'md' | 'lg'
  noPadding?: boolean
  appendStart?: string | React.ReactNode
  appendEnd?: string | React.ReactNode
}

export const Format = ({
  text,
  isRequired,
  type = 'text',
  options,
  className,
  size = 'md',
  noPadding = false,
  appendStart,
  appendEnd,
  ...props
}: FormatProps) => {
  return (
    <span
      className={cn(
        "block text-small font-medium text-foreground pb-1.5 will-change-auto origin-top-left transition-all !duration-200 !ease-out motion-reduce:transition-none data-[required=true]:after:content-['*'] data-[required=true]:after:ml-0.5 after:text-danger",
        {
          'text-xs': size === 'xs',
          'text-sm': size === 'sm',
          'text-base': size === 'md',
          'text-lg': size === 'lg',
          'p-0': noPadding
        },
        className
      )}
      data-required={isRequired}
      {...props}
    >
      {type === 'text' && text}
      {type === 'price' && (
        <FormatPrice
          toFormat={text}
          appendStart={appendStart}
          appendEnd={appendEnd}
          {...options?.price}
        />
      )}
      {type === 'date' && (
        <FormatDate
          date={text}
          appendStart={appendStart}
          appendEnd={appendEnd}
          {...options?.date}
        />
      )}
    </span>
  )
}
