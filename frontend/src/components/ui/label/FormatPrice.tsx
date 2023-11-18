import i18next from 'i18next'

type FormatPriceProps = Intl.NumberFormatOptions & {
  toFormat: string | number | bigint
  appendStart?: string | React.ReactNode
  appendEnd?: string | React.ReactNode
}

export const FormatPrice = ({
  toFormat,
  appendStart,
  appendEnd,
  ...props
}: FormatPriceProps) => {
  if (typeof toFormat === 'string') {
    toFormat = +toFormat
  }

  return (
    <>
      {appendStart}
      {new Intl.NumberFormat(i18next.language, {
        style: 'currency',
        currency: 'BRL',
        ...props
      }).format(toFormat)}
      {appendEnd}
    </>
  )
}
