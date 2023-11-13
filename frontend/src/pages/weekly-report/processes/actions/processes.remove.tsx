import { AlertModal } from '@/components/ui/AlertModal'
import { Button, useDisclosure } from '@nextui-org/react'
import { Trash2 } from 'lucide-react'
import { useProcesses } from '../context/ProcessProvider'

type RemoveProcessProps = {
  index: number
}

export const RemoveProcess = ({ index }: RemoveProcessProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { t, array } = useProcesses()

  const handleRemove = () => {
    array.remove(index)
  }

  return (
    <>
      <Button
        type="button"
        color="danger"
        variant="solid"
        onClick={onOpen}
        className="opacity-90"
        isIconOnly
      >
        <Trash2 className="w-5 h-5" />
      </Button>
      <AlertModal
        title={t('process.delete.title')}
        onAction={handleRemove}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        {t('process.delete.description')}
      </AlertModal>
    </>
  )
}
