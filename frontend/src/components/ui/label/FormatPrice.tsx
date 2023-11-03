import i18next from 'i18next'

type FormatPriceProps = Intl.NumberFormatOptions & {
  toFormat: string | number | bigint
}

export const FormatPrice = ({ toFormat, ...props }: FormatPriceProps) => {
  if (typeof toFormat === 'string') {
    toFormat = +toFormat
  }

  return new Intl.NumberFormat(i18next.language, {
    style: 'currency',
    currency: 'BRL',
    ...props
  }).format(toFormat)
}
