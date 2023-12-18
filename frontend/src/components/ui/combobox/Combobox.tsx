import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  cn,
  useDisclosure
} from '@nextui-org/react'
import { ChevronsUpDown, Loader, SearchIcon } from 'lucide-react'
import { useId, useState } from 'react'
import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { DebouncedInput } from '../DebouncedInput'
import { ComboboxItems } from './ComboboxItems'

export type ComboboxItem = {
  key: string
  value: string
}

type DropdownProps<T extends FieldValues, K extends FieldPath<T>> = {
  field: ControllerRenderProps<T, K>
  items: ComboboxItem[]
  isRequired?: boolean
  label?: string
  errorMessage?: string
  placeholder?: string
  isLoading?: boolean
  afterChange?: ControllerRenderProps['onChange']
  textValue?: string
}

export const Combobox = <T extends FieldValues, K extends FieldPath<T>>({
  field,
  label,
  isRequired,
  errorMessage,
  placeholder,
  items,
  isLoading = true,
  afterChange
}: DropdownProps<T, K>) => {
  const id = useId()
  const { t } = useTranslation('default')
  const { isOpen, onOpenChange, onClose } = useDisclosure()
  const [search, setSearch] = useState('')

  const filtered = items?.filter((item) =>
    item.value.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      {!!label && (
        <label
          htmlFor={id}
          className="block text-small font-medium text-foreground pb-1.5 will-change-auto origin-top-left transition-all !duration-200 !ease-out motion-reduce:transition-none data-[required=true]:after:content-['*'] data-[required=true]:after:ml-0.5 after:text-danger"
          data-required={isRequired}
        >
          {label}
        </label>
      )}
      <Popover
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        triggerScaleOnOpen={false}
        placement="bottom"
        radius="md"
      >
        <PopoverTrigger>
          <Button
            id={id}
            type="button"
            className={cn(
              'w-full justify-between px-3 text-left font-normal bg-default-100 hover:bg-default-200',
              !field.value && 'text-gray-400'
            )}
          >
            {items.find((value) => value.key === field.value)?.value ??
              placeholder ??
              t('combobox.search_for')}
            {!isLoading ? (
              <ChevronsUpDown className="h-4 w-4 opacity-50" />
            ) : (
              <Loader className="h-4 w-4 opacity-50 animate-spin" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <DebouncedInput
            id={`combobox-search-${id}`}
            variant="underlined"
            color="primary"
            startContent={
              <SearchIcon className="w-5 h-5 top-1 text-foreground-500" />
            }
            placeholder={t('combobox.search_for')}
            classNames={{
              inputWrapper: 'rounded-b-none !pl-5 !pr-3 h-unit-12'
            }}
            autoComplete="off"
            debounce={50}
            value={search}
            onChange={(value) => setSearch(value)}
            onClear={() => setSearch('')}
            isClearable
            autoFocus
          />
          <ComboboxItems
            field={field}
            items={filtered}
            afterChange={afterChange}
            onClose={onClose}
          />
          {filtered.length === 0 && (
            <p className="py-5 text-center text-default-400">
              {t('combobox.no_results')}
            </p>
          )}
        </PopoverContent>
      </Popover>
      {!!errorMessage && (
        <p className="pt-1 px-1 text-tiny text-danger">{errorMessage}</p>
      )}
    </div>
  )
}
