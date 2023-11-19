import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react'
import { Copy, MoreHorizontal } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AdvertisingPaymentColumns } from './advertisings.columns'

type AdvertisingPaymentActionsProps = {
  row: AdvertisingPaymentColumns
}

export const AdvertisingsPaymentActions = ({
  row
}: AdvertisingPaymentActionsProps) => {
  const { t } = useTranslation()

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light" isIconOnly>
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="dropdown reporter">
        <DropdownItem
          textValue="copy id"
          onClick={() => navigator.clipboard.writeText(row.advertisingId)}
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
