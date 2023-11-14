import { AlertModal } from '@/components/ui/AlertModal'
import { useFetch } from '@/hooks/useFetch'
import { backend, routes } from '@/routes/routes'
import { replaceParams } from '@/utils/replace-params'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Link,
  useDisclosure
} from '@nextui-org/react'
import { Copy, FileSignature, MoreHorizontal } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AdvertisingColumns } from './advertisings.columns'

type AdvertisingsActionsProps = {
  row: AdvertisingColumns
}

export const AdvertisingsActions = ({ row }: AdvertisingsActionsProps) => {
  const { t } = useTranslation()
  const { isOpen, onOpenChange } = useDisclosure()

  const { removeMany } = useFetch<AdvertisingColumns>({
    baseUrl: backend.advertisings.baseUrl,
    query: ['advertisings']
  })

  const handleDelete = async () => {
    await removeMany.mutateAsync(row)
  }

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="light" isIconOnly>
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="dropdown reporter">
          <DropdownSection title={t('table.actions')}>
            <DropdownItem textValue="status_update">
              <Link
                href={replaceParams(routes.advertisings.admin.status_update, [
                  row.id
                ])}
                color="foreground"
                className="flex gap-2"
              >
                <FileSignature className="w-5 h-5" />
                Visualizar propaganda
              </Link>
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
