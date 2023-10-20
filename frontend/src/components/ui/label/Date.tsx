import i18next from 'i18next'

type DateProps = Intl.DateTimeFormatOptions & {
  date: string | Date
}

export const LDate = ({ date, ...props }: DateProps) => {
  if (typeof date === 'string') {
    date = new Date(date)
  }

  return new Intl.DateTimeFormat(i18next.language, {
    dateStyle: 'medium',
    ...props
  }).format(date)
}
