import { Button, useDisclosure } from '@nextui-org/react'
import { Trash } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AlertModal } from '../AlertModal'

type TableDeleteButton = {
  isDisabled: boolean
  handleDelete: () => void
}

export const TableDeleteButton = ({ isDisabled, handleDelete }) => {
  const { t } = useTranslation()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button
        color="danger"
        onClick={onOpen}
        isDisabled={isDisabled}
        isIconOnly
      >
        <Trash className="w-5 h-5" />
      </Button>
      <AlertModal
        title={t('common:are_you_certain.title')}
        onAction={handleDelete}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        {t('common:are_you_certain_delete.description')}
      </AlertModal>
    </>
  )
}
