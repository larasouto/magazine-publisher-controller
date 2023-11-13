import { Button } from '@nextui-org/react'
import { PlusCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { useProcesses } from '../context/ProcessProvider'

export const AddProcesses = () => {
  const { t, sorting, array } = useProcesses()
  const [selectedKey] = sorting[0]

  const handleAddProcess = () => {
    if (array.fields.length === 10) {
      toast.error(t('process.limit'), { id: 'process-limit' })
      return
    }

    if (selectedKey === 'ASC') {
      array.append({
        group: '',
        name: '',
        description: '',
        filesFolder: ''
      })
      return
    }
    array.prepend({
      group: '',
      name: '',
      description: '',
      filesFolder: ''
    })
  }

  return (
    <div className="w-full flex items-center justify-between gap-1.5">
      <div className="flex items-center gap-1">
        <span className="text-lg">{t('process.title')}</span>
        <Button
          type="button"
          variant="light"
          className="text-green-600 rounded-full hover:text-green-700"
          onPress={handleAddProcess}
          isIconOnly
        >
          <PlusCircle className="w-6 h-6" />
        </Button>
      </div>
    </div>
  )
}
