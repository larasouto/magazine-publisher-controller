import { DefaultAnimate } from '@/components/ui/animation/DefaultAnimate'
import { cn } from '@nextui-org/react'
import { useProcesses } from './context/ProcessProvider'
import { ProcessItem } from './processes.item'

export const ProcessesItems = () => {
  const { array } = useProcesses()

  return (
    <>
      {array.fields.map((field, index) => (
        <DefaultAnimate
          key={field.id}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className={cn('relative gap-3 border border-dashed rounded-md p-4', {
            'border-green-800 dark:bg-green-950/5': !field.filesFolder,
            'border-blue-700 dark:bg-blue-950/5': field.filesFolder
          })}
        >
          <ProcessItem field={field} index={index} />
        </DefaultAnimate>
      ))}
    </>
  )
}
