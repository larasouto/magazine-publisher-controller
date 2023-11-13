import { frontend } from '@/routes/routes'
import { Button, Link } from '@nextui-org/react'
import { PlusIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const WeeklyReportToolbar = () => {
  const { t } = useTranslation('weekly-report')

  return (
    <Link href={frontend.weekly_report.new}>
      <Button color="primary" endContent={<PlusIcon />}>
        {t('page.new')}
      </Button>
    </Link>
  )
}
