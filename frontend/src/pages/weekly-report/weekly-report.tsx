import { usePageUtils } from '@/hooks/usePageUtils'
import { PageLayout } from '@/layout/PageLayout'
import { frontend } from '@/routes/routes'
import { WeeklyReportForm } from './weekly-report.form'
import { WeeklyReportProvider } from './processes/context/WeeklyReportProvider'

const data = {
  id: '109b84fa-afcb-4815-9600-450caad03aef',
  projectId: '109b84fa-afcb-4815-9600-450caad03aef',
  weeklyEvaluationId: '6ad9b93c-6541-4be5-a090-24ed5fcdb889',
  toolEvaluation: '<h1>Test</h1>',
  processes: [
    {
      group: '109b84fa-afcb-4815-9600-450caad03aef',
      name: '109b84fa-afcb-4815-9600-450caad03aef',
      description: 'Hello, there!!',
      filesFolder: '109b84fa-afcb-4815-9600-450caad03aef'
    }
  ]
}

export const WeeklyReportPage = () => {
  const { t, title, breadcrumb } = usePageUtils('weekly-report', {
    dynamic: true
  })

  return (
    <PageLayout
      title={title()}
      breadcrumb={breadcrumb({
        segments: [
          { label: t('page.title'), link: frontend.weekly_report.index }
        ]
      })}
    >
      <WeeklyReportProvider>
        <WeeklyReportForm data={data} />
      </WeeklyReportProvider>
    </PageLayout>
  )
}
