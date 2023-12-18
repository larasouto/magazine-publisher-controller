import { Button, useDisclosure } from '@nextui-org/react'
import { Trash } from 'lucide-react'
import { AlertModal } from '../AlertModal'

type TableDeleteButton = {
  isDisabled: boolean
  handleDelete: () => void
}

export const TableDeleteButton = ({ isDisabled, handleDelete }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button
        color="danger"
        onPress={onOpen}
        isDisabled={isDisabled}
        className="self-end sm:self-auto"
        isIconOnly
      >
        <Trash className="w-5 h-5" />
      </Button>
      <AlertModal
        title={'Você tem certeza?'}
        onAction={handleDelete}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        Você tem certeza que deseja excluir os itens selecionados?{' '}
        <span className="underline underline-offset-4 text-danger/70">
          Esta ação não poderá ser desfeita.
        </span>
      </AlertModal>
    </>
  )
}
