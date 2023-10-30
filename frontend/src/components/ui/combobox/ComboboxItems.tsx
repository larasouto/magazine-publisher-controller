import { Listbox, ListboxItem, ScrollShadow, cn } from '@nextui-org/react'
import { Check } from 'lucide-react'
import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form'
import { ComboboxItem } from './Combobox'

type ComboboxItemsProps<T extends FieldValues, K extends FieldPath<T>> = {
  field: ControllerRenderProps<T, K>
  items: ComboboxItem[]
  label?: string
  onClose: () => void
  afterChange?: ControllerRenderProps['onChange']
}

export const ComboboxItems = <T extends FieldValues, K extends FieldPath<T>>({
  field,
  label,
  items,
  onClose,
  afterChange
}: ComboboxItemsProps<T, K>) => {
  return (
    <ScrollShadow className="w-full max-h-80" size={0}>
      <Listbox label={label ?? 'combobox label'} className="xss:w-80 xs:w-96">
        {items.map((item) => (
          <ListboxItem
            key={item.key}
            value={item.key}
            variant="flat"
            className={cn(item.key === field.value && 'bg-default-200/60')}
            onClick={() => {
              field.onChange(item.key)
              onClose()
            }}
            onPress={() => {
              field.onChange(item.key)
              afterChange?.(item.key)
            }}
            startContent={
              <Check
                className={cn(
                  'w-4 h-4',
                  item.key === field.value ? 'visible' : 'invisible'
                )}
              />
            }
          >
            {item.value}
          </ListboxItem>
        ))}
      </Listbox>
    </ScrollShadow>
  )
}
