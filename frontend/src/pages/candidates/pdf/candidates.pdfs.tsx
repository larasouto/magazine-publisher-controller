import { useSupabase } from '@/hooks/useSupabase'
import { Input } from '@nextui-org/react'
import { ChangeEvent, useMemo } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { v4 as uuid } from 'uuid'
import { CandidateData } from '../candidates.schema'

type CandidatesPdfProps = {
  form: UseFormReturn<CandidateData>
  errorMessage?: string
}

export const CandidatesPdf = ({ form, errorMessage }: CandidatesPdfProps) => {
  const { uploadPdf } = useSupabase()

  const filePath = useMemo(() => {
    return form.getValues('pdfPath')?.[0]?.split('/')?.[1] ?? uuid()
  }, [form])

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target.files

    if (!target) {
      return
    }

    for (const file of target) {
      await uploadPdf({
        file,
        path: 'candidates/' + filePath + '/' + file.name
      })
    }

    form.setValue('pdfPath', filePath)
    form.trigger('pdfPath')
  }

  return (
    <>
      <Input
        id="image"
        type="file"
        label="PDF"
        labelPlacement="outside"
        placeholder="Selecione o arquivo PDF"
        multiple
        accept="pdf/*"
        onChange={handleFile}
      />
      <div className="p-1 text-tiny text-danger">{errorMessage}</div>
    </>
  )
}
