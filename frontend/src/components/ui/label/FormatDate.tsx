import i18next from 'i18next'

type FormatDateProps = Intl.DateTimeFormatOptions & {
  date: string | Date
  appendStart?: string | React.ReactNode
  appendEnd?: string | React.ReactNode
}

export const FormatDate = ({
  date,
  appendStart,
  appendEnd,
  ...props
}: FormatDateProps) => {
  if (typeof date === 'string') {
    date = new Date(date)
  }

  return (
    <>
      {appendStart}
      {new Intl.DateTimeFormat(i18next.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...props
      }).format(date)}
      {appendEnd}
    </>
  )
}
