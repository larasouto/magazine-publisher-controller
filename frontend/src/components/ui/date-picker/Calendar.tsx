import { cn } from '@nextui-org/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker } from 'react-day-picker'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

export const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) => {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        root: 'bg-default-100 rounded-lg',
        months: 'flex flex-col sm:flex-row gap-5',
        month: 'space-y-2',
        caption: 'relative flex justify-center items-center mb-4',
        caption_label: 'text-sm font-medium text-primary',
        nav: 'flex items-center gap-1',
        nav_button: 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'text-foreground-600 rounded-lg w-full font-normal text-[0.8rem]',
        row: 'flex w-full mt-1.5',
        cell: 'text-center text-sm p-0 relative focus-within:relative focus-within:z-20 hover:rounded-lg',
        day: 'hover:bg-primary hover:rounded-lg hover:text-foreground hover:!text-white h-9 w-9 p-0 font-normal aria-selected:opacity-100',
        day_selected: cn(
          'bg-primary !text-foreground hover:!bg-primary hover:text-foreground focus:bg-primary focus:text-foreground',
          { 'rounded-lg': props.mode === 'single' }
        ),
        day_today:
          'bg-primary-200 text-foreground !rounded-lg aria-selected:rounded-none outline-none',
        day_outside: 'text-foreground-500 !opacity-50',
        day_disabled: 'text-foreground-500 opacity-50 cursor-not-allowed',
        day_range_start:
          'aria-selected:bg-primary aria-selected:rounded-l-lg hover:rounded-none !text-white',
        day_range_middle: 'aria-selected:bg-default hover:rounded-none',
        day_range_end:
          'aria-selected:bg-primary aria-selected:rounded-r-lg hover:rounded-none !text-white',
        day_hidden: 'invisible',
        ...classNames
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />
      }}
      {...props}
    />
  )
}
