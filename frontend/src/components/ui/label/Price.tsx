import i18next from 'i18next'

type PriceProps = Intl.NumberFormatOptions & {
  toFormat: string | number | bigint
}

export const Price = ({ toFormat, ...props }: PriceProps) => {
  if (typeof toFormat === 'string') {
    toFormat = +toFormat
  }

  return new Intl.NumberFormat(i18next.language, {
    style: 'currency',
    currency: 'BRL',
    ...props
  }).format(toFormat)
}
