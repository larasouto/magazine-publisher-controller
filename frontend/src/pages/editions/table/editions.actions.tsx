import { useMagazine } from '@/hooks/useMagazine'
import { routes } from '@/routes/routes'
import { replaceParams } from '@/utils/replace-params'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Link
} from '@nextui-org/react'
import { Copy, FileSignature, MoreHorizontal, Shield } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { EditionColumns } from './editions.columns'

type EditionsActionsProps = {
  row: EditionColumns
}

export const EditionsActions = ({ row }: EditionsActionsProps) => {
  const { t } = useTranslation()
  const { remove } = useMagazine()

  const handleDelete = async () => {
    await remove.mutateAsync(row.id)
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light" isIconOnly>
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="dropdown reporter">
        <DropdownSection title={t('table.actions')}>
          <DropdownItem textValue="edit">
            <Link
              href={replaceParams(routes.editions.new, [row.id])}
              color="foreground"
              className="flex gap-2"
            >
              <FileSignature className="w-5 h-5" />
              {t('btn.edit')}
            </Link>
          </DropdownItem>
          <DropdownItem textValue="remove" onClick={handleDelete} showDivider>
            <span className="flex gap-2 text-danger">
              <Shield className="w-5 h-5" />
              {t('btn.delete')}
            </span>
          </DropdownItem>
        </DropdownSection>
        <DropdownItem
          textValue="copy id"
          onClick={() => navigator.clipboard.writeText(row.id)}
        >
          <span className="flex gap-2">
            <Copy className="w-5 h-5" />
            {t('btn.copy_id')}
          </span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}