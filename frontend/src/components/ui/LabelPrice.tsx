import i18next from 'i18next'

type LabelPriceProps = Intl.NumberFormatOptions & {
  toFormat: string | number | bigint
}

export const LabelPrice = ({ toFormat, ...props }: LabelPriceProps) => {
  if (typeof toFormat === 'string') {
    toFormat = +toFormat
  }

  return new Intl.NumberFormat(i18next.language, {
    style: 'currency',
    currency: i18next.language === 'en-US' ? 'USD' : 'BRL',
    ...props
  }).format(toFormat)
}
