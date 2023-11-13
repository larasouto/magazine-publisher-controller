import { TFunction } from 'i18next'
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState
} from 'react'
import { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { WeeklyReportData } from '../../weekly-report.schema'

type ProcessesContextProps = {
  form: UseFormReturn<WeeklyReportData>
  array: UseFieldArrayReturn<WeeklyReportData>
  t: TFunction<'table', undefined>
  sorting: [Set<string>, Dispatch<SetStateAction<Set<string>>>]
}

type ProcessesProviderProps = {
  value: Omit<ProcessesContextProps, 't' | 'sorting'>
  children: React.ReactNode
}

const ProcessesContext = createContext<ProcessesContextProps | null>(null)

export const ProcessesProvider = ({
  value,
  children
}: ProcessesProviderProps) => {
  const { t } = useTranslation('weekly-report')
  const sorting = useState(new Set(['DESC']))

  return (
    <ProcessesContext.Provider value={{ ...value, t, sorting }}>
      {children}
    </ProcessesContext.Provider>
  )
}

export const useProcesses = () => {
  const context = useContext(ProcessesContext)

  if (!context) {
    throw new Error(
      'useProcessesContext must be used within a ProcessesProvider'
    )
  }

  return context
}
