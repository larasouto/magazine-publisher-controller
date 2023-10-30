import i18next from 'i18next'

type FormatDateProps = Intl.DateTimeFormatOptions & {
  date: string | Date
}

export const FormatDate = ({ date, ...props }: FormatDateProps) => {
  if (typeof date === 'string') {
    date = new Date(date)
  }

  return new Intl.DateTimeFormat(i18next.language, {
    dateStyle: 'medium',
    ...props
  }).format(date)
}
