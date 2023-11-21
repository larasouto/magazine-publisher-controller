import { Button, useDisclosure } from '@nextui-org/react'
import { Trash } from 'lucide-react'
import { AlertModal } from '../AlertModal'
import { useDataTable } from './context/DataTableProvider'

type TableDeleteButton = {
  isDisabled: boolean
  handleDelete: () => void
}

export const TableDeleteButton = ({ isDisabled, handleDelete }) => {
  const { t } = useDataTable()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button
        color="danger"
        onClick={onOpen}
        isDisabled={isDisabled}
        className="self-end sm:self-auto"
        isIconOnly
      >
        <Trash className="w-5 h-5" />
      </Button>
      <AlertModal
        title={t('generic_delete.title')}
        onAction={handleDelete}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        {t('generic_delete.description')}
      </AlertModal>
    </>
  )
}
