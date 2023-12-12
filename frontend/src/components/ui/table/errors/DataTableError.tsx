import { ServerCrash, ShieldAlert, XCircle } from 'lucide-react'
import { Trans, useTranslation } from 'react-i18next'
import { Text } from '../../label2/Text'

export const DataTableError = () => {
  const { t } = useTranslation('table')

  return (
    <div className="h-[calc(100vh-20rem)] flex flex-col items-center justify-center gap-3">
      <div className="flex gap-3 hover:text-danger">
        <XCircle className="text-danger-400 dark:text-foreground-200 h-24 w-24 dark:hover:text-danger" />
        <ServerCrash className="text-danger-400 dark:text-foreground-200 h-24 w-24 dark:hover:text-danger" />
        <ShieldAlert className="text-danger-400 dark:text-foreground-200 h-24 w-24 dark:hover:text-danger" />
      </div>
      <Text
        size="lg"
        color="danger"
        className="flex flex-col items-center gap-2"
        as="p"
      >
        <span className="text-black dark:text-foreground-300 text-center select-none">
          <Trans
            t={t}
            i18nKey="error.description"
            components={{
              span: (
                <span className="text-danger underline underline-offset-4" />
              ),
              br: <br />
            }}
          />
        </span>
      </Text>
    </div>
  )
}
