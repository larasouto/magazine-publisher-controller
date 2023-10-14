import { Button } from '@nextui-org/react'
import { Trash } from 'lucide-react'

type TableDeleteButton = {
  isDisabled: boolean
  handleDelete: () => void
}

export const TableDeleteButton = ({ isDisabled, handleDelete }) => {
  return (
    <Button
      color="danger"
      onClick={handleDelete}
      isDisabled={isDisabled}
      isIconOnly
    >
      <Trash className="w-5 h-5" />
    </Button>
  )
}
