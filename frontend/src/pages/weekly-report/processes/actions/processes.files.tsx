import { Button } from '@nextui-org/react'
import { UploadIcon } from 'lucide-react'
import { ChangeEvent, useCallback, useMemo } from 'react'
import { FieldArrayWithId } from 'react-hook-form'
import { WeeklyReportDataWithId } from '../../weekly-report.schema'
import { useProcesses } from '../context/ProcessProvider'
import { useWeeklyReport } from '../context/WeeklyReportProvider'
import { v4 as uuid } from 'uuid'

type UploadProcess = {
  field: FieldArrayWithId<WeeklyReportDataWithId>
  index: number
}

export const FilesProcess = ({ field, index }: UploadProcess) => {
  const { form } = useProcesses()
  const { addImages } = useWeeklyReport()

  const filesFolder = useMemo(() => {
    return field.filesFolder ?? uuid()
  }, [field])

  const handleUpload = () => {
    document.getElementById(`processes.${index}.hidden`)?.click()
  }

  const onChangeFile = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      console.log(filesFolder)
      form.setValue(`processes.${index}.filesFolder`, filesFolder)
      console.log('chamu essa caralha????')

      if (!files) {
        return
      }

      addImages(filesFolder, files)
    },
    [addImages, filesFolder, form, index]
  )

  return (
    <>
      <input
        id={`processes.${index}.hidden`}
        type="file"
        multiple
        accept="image/*, application/pdf"
        className="invisible absolute"
        onChange={onChangeFile}
      />
      <Button
        id={`processes.${index}.filesFolder`}
        type="button"
        color="default"
        variant="flat"
        onPress={handleUpload}
        isIconOnly
      >
        <UploadIcon className="w-5 h-5" />
      </Button>
    </>
  )
}
