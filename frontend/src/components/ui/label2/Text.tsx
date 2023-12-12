import { cn } from '@/lib/utils'
import i18next from 'i18next'
import { ComponentProps } from 'react'
import { PressEvent, usePress } from 'react-aria'
import { FormatDate } from './FormatDate'
import { FormatPrice } from './FormatPrice'

type TextProps = Omit<ComponentProps<'span'>, 'ref'> & {
  isRequired?: boolean
  format?: {
    as: 'price' | 'date' | 'number'
    text: string | number
    options?: {
      date?: Intl.DateTimeFormatOptions
      price?: Intl.NumberFormatOptions
      number?: Intl.NumberFormatOptions
    }
  }
  prepend?: React.ReactNode
  append?: React.ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg'
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'div' | 'p'
  color?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning'
  isInvalid?: boolean
  withPadding?: boolean
  onPress?: (e: PressEvent) => void
}

export const Text = ({
  isRequired,
  format,
  className,
  size = 'md',
  as = 'span',
  withPadding = false,
  isInvalid = false,
  color,
  append,
  prepend,
  onPress,
  ...props
}: TextProps) => {
  const Component = as ?? 'span'
  const { pressProps } = usePress({ onPress })
  const usePressProps = onPress ? pressProps : {}

  return (
    <Component
      {...usePressProps}
      className={cn(
        "block text-small font-medium text-foreground will-change-auto origin-top-left transition-all !duration-200 !ease-out motion-reduce:transition-none data-[required=true]:after:content-['*'] data-[required=true]:after:ml-0.5 after:text-danger focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:rounded-md",
        {
          'text-xs': size === 'xs',
          'text-sm': size === 'sm',
          'text-base': size === 'md',
          'text-lg': size === 'lg',
          'pb-1.5': withPadding
        },
        {
          'text-primary': color === 'primary',
          'text-secondary': color === 'secondary',
          'text-danger': color === 'danger',
          'text-success': color === 'success',
          'text-warning': color === 'warning'
        },
        {
          'text-danger': isInvalid
        },
        className
      )}
      data-required={isRequired}
      role={onPress ? 'button' : undefined}
      tabIndex={onPress ? 0 : undefined}
      {...props}
    >
      {prepend && <span className="mr-0.5">{prepend}</span>}

      {format?.as === 'price' && (
        <FormatPrice toFormat={format.text} {...format.options?.price} />
      )}

      {format?.as === 'date' && (
        <FormatDate date={String(format.text)} {...format.options?.date} />
      )}

      {format?.as === 'number' &&
        new Intl.NumberFormat(i18next.language, {
          ...format.options?.number,
          style: 'decimal'
        }).format(Number(format.text))}
      {!format && props.children}

      {append && <span className="ml-0.5">{append}</span>}
    </Component>
  )
}
